import { Routes } from '@angular/router';
import { AstroidsComponent } from './pages/astroids/astroids.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'dashboard'
    }, {
        path: 'dashboard',
        component: DashboardComponent
    }, {
        path: 'astroids',
        component: AstroidsComponent
    }
];
