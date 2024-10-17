import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GoogleMapsService {
  private apiKey = environment.googleMapsApiKey; // Directly use the key from environment
  private scriptLoaded = false;

  loadGoogleMapsAPI(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&libraries=places&callback=initMap`;
      script.async = true;
      script.defer = true;

      script.onload = () => resolve();
      script.onerror = (error: any) => reject(error);

      document.head.appendChild(script);
    });
  }
}
