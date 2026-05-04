import { Routes } from '@angular/router';
import { Login } from './features/login/login';
import { Dashboard } from './features/dashboard/dashboard';
import { AuthGuard } from './core/services/auth-guard/auth-guard';
import { ListaUtenti } from './features/dashboard/pages/lista-utenti/lista-utenti';
import { Homepage } from './features/dashboard/pages/homepage/homepage';
import { ListaPost } from './features/dashboard/pages/lista-post/lista-post';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch:'full'},
    {path: 'login', component: Login},
    { path: 'dashboard', component: Dashboard, canActivate: [AuthGuard], children: [
        { path: '', redirectTo: 'homepage', pathMatch: 'full' },
        { path: 'homepage', component: Homepage },
        { path:'lista-utenti', component: ListaUtenti },
        { path:'lista-post', component: ListaPost }
    ] }
];
