import { Routes } from '@angular/router';
import { HomeComponent } from './home/home-component';
import { RicercaRicette } from './ricerca-ricette/ricerca-ricette';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'ricette', component: RicercaRicette}
];
