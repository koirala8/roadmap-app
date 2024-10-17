import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { GoogleMap, MapHeatmapLayer } from '@angular/google-maps';
import { FormsModule } from '@angular/forms';
import { GoogleMapsService } from '../../mapService/GoogleMapService';
import { NgIf, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'google-map-demo',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  standalone: true,
  imports: [GoogleMap, MapHeatmapLayer, FormsModule, NgIf],
})
export class GoogleMapDemo implements OnInit {
  center = { lat: 37.774546, lng: -122.433523 }; // Default center
  zoom = 12;
  address: string = '';
  heatmapData: google.maps.LatLngLiteral[] = [];
  places: google.maps.places.PlaceResult[] = [];
  mapLoaded: boolean = false; // Flag to track if the map is ready

  constructor(
    private googleMapsService: GoogleMapsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.googleMapsService.loadGoogleMapsAPI()
        .then(() => {
          this.mapLoaded = true; // Set mapLoaded to true when the API is loaded
        })
        .catch(error => {
          console.error('Error loading Google Maps API:', error);
        });
    }
  }

  async generateHeatmapAndPlaces() {
    if (this.address) {
      try {
        const latLng = await this.geocodeAddress(this.address);
        if (latLng) {
          this.center = latLng; // Update the center for the Google Map
          this.heatmapData = this.generateHeatmapPoints(latLng);
          await this.fetchNearbyPlaces(latLng);
        }
      } catch (error) {
        console.error('Error in generateHeatmapAndPlaces:', error);
      }
    }
  }

  async geocodeAddress(address: string): Promise<google.maps.LatLngLiteral | null> {
    const geocoder = new google.maps.Geocoder();

    return new Promise((resolve, reject) => {
      geocoder.geocode({ address }, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          reject('Geocode was not successful for the following reason: ' + status);
        }
      });
    });
  }

  generateHeatmapPoints(latLng: google.maps.LatLngLiteral): google.maps.LatLngLiteral[] {
    const points: google.maps.LatLngLiteral[] = [];
    const radius = 0.001;

    for (let latOffset = -radius; latOffset <= radius; latOffset += 0.0001) {
      for (let lngOffset = -radius; lngOffset <= radius; lngOffset += 0.0001) {
        points.push({
          lat: latLng.lat + latOffset,
          lng: latLng.lng + lngOffset,
        });
      }
    }

    return points;
  }

  async fetchNearbyPlaces(latLng: google.maps.LatLngLiteral) {
    const service = new google.maps.places.PlacesService(new google.maps.Map(document.createElement('div')));

    service.nearbySearch({
      location: latLng,
      radius: 500,
      type: 'establishment',
    }, (results, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK && results) {
        this.places = results;
        console.log('Nearby Places:', this.places);
      } else {
        console.error('Error fetching places:', status);
      }
    });
  }
}
