import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Define the initMap function for Google Maps API
(window as any).initMap = () => {
  console.log('Google Maps API loaded and initMap called');
};

// Bootstrap the Angular application
bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
