import { Routes } from '@angular/router';
import { AuthGuard } from './core/services/auth-guard/auth-guard';


export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch:'full'},
    {path: 'login', loadComponent: () => import('./features/login/login'),},
    { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard'), canActivate: [AuthGuard], children: [
        { path: '', redirectTo: 'homepage', pathMatch: 'full' },
        { path: 'homepage', loadComponent: () => import('./features/dashboard/pages/homepage/homepage') },
        { path:'lista-utenti', loadComponent: () => import('./features/dashboard/pages/lista-utenti/lista-utenti') },
        { path: 'lista-post', loadComponent: () => import('./features/dashboard/pages/lista-post/lista-post') },
        { path: 'dettagli-utente/:idUtente', loadComponent: () => import('./features/dashboard/pages/dettagli-utente/dettagli-utente')}
    ] }
];
