import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Dashboard } from './features/dashboard/dashboard';
import { AuthGuard } from './core/services/auth-guard/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch:'full'},
    {path: 'login', component: Login},
    { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard], children: [
        
    ] }
];
