import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private apiKey = environment.googleMapsApiKey;

  loadGoogleMapsAPI(): Promise<void> {
    return new Promise((resolve, reject) => {
      // Check if the API has already been loaded
      if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
        resolve();
        return;
      }

      // Create a script element for the Google Maps API
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places&callback=initMap`;

      // Ensure optimal loading
      script.async = true;  // Load script asynchronously
      script.defer = true;  // Ensure execution is deferred until the document has been parsed

      // Resolve the promise when the script loads
      script.onload = () => resolve();
      script.onerror = (error: any) => reject(error);

      // Append the script to the document
      document.head.appendChild(script);
    });
  }
}

