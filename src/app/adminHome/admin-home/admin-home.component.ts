import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { AsyncPipe, CommonModule, isPlatformBrowser } from '@angular/common';
import { GoogleMap, MapDirectionsService, MapDirectionsRenderer } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'google-map-demo',
  templateUrl: './admin-home.component.html',
  standalone: true,
  imports: [GoogleMap, MapDirectionsRenderer, FormsModule, AsyncPipe, CommonModule],
})
export class GoogleMapDemo implements AfterViewInit {
  center: google.maps.LatLngLiteral = { lat: 24, lng: 12 }; // Default center
  zoom: number = 7; // Initial zoom level
  display?: google.maps.LatLngLiteral;
  mapLoaded: boolean = false; // Track if the map is loaded

  origin: string = '';
  destination: string = '';
  loading: boolean = false;
  errorMessage: string | null = null;
  directions$!: Observable<google.maps.DirectionsResult | null>; // Observable can be null

  constructor(
    private mapDirectionsService: MapDirectionsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.mapLoaded = true; // Set map loaded to true
    }
  }

  get mapCenter(): google.maps.LatLngLiteral {
    return this.center; // Always defined since it's initialized
  }

  setDirection() {
    this.loading = true; // Start loading
    this.errorMessage = null; // Reset error message

    if (this.origin && this.destination) {
      const request: google.maps.DirectionsRequest = {
        origin: this.origin,
        destination: this.destination,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      this.directions$ = this.mapDirectionsService.route(request).pipe(
        map(response => {
          this.loading = false; // Stop loading
          if (response.status === google.maps.DirectionsStatus.OK && response.result) {
            this.center = response.result.routes[0].legs[0].end_location.toJSON();
            return response.result; // Return DirectionsResult
          } else {
            this.errorMessage = `Unable to fetch directions: ${response.status}`;
            console.error('Error fetching directions', response.status);
            return null; // Return null if directions are not found
          }
        }),
        catchError(err => {
          this.loading = false; // Stop loading on error
          this.errorMessage = 'Error fetching directions';
          console.error('Error fetching directions', err);
          return of(null); // Return null on error
        })
      );
    } else {
      this.errorMessage = 'Please enter both starting and final points.';
    }
  }

  moveMap(event: google.maps.MapMouseEvent) {
    this.center = event.latLng?.toJSON() as google.maps.LatLngLiteral; // Type assertion
  }

  move(event: google.maps.MapMouseEvent) {
    this.display = event.latLng?.toJSON();
  }
}
