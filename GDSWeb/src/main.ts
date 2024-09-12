// Author: Joshua Payne
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(
      withFetch() // Sets HTTP client to use fetch API. (Supressed warning in console)
    ),
    provideRouter(routes)
  ]
}).catch(err => console.error(err));