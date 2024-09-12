// Author: Joshua Payne
import { Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { FormComponent } from './components/form/form.component';
import { ResultsComponent } from './components/results/results.component';
import { LearnComponent } from './components/learn/learn.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'form', component: FormComponent },
  { path: 'results', component: ResultsComponent },
  { path: 'learn', component: LearnComponent }
];