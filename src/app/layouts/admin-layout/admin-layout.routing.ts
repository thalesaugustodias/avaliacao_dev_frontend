import { Routes } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { ContasComponent } from 'app/contas/contas.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: HomeComponent },
    { path: 'contas',         component: ContasComponent }
]