import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { setLayout } from './core/resolvers/page-layout.resolver';
import { PageLayout } from './core/enums/page-layout';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    title: 'Panel de control',
    resolve: {
      layout: setLayout(PageLayout.Dashboard),
    },
  },
  {
    path: 'users',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/users/users.component').then((c) => c.UsersComponent),
    title: 'Usuarios',
    resolve: {
      layout: setLayout(PageLayout.Dashboard),
    },
  },
  {
    path: 'users/create',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/users/create/create-user.component').then(
        (c) => c.CreateUserComponent
      ),
    title: 'Registrar usuario',
    resolve: {
      layout: setLayout(PageLayout.Dashboard),
    },
  },
  {
    path: 'grades',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/dashboard/dashboard.component').then(
        (c) => c.DashboardComponent
      ),
    title: 'Grados',
    resolve: {
      layout: setLayout(PageLayout.Dashboard),
    },
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/auth/login.component').then((c) => c.LoginComponent),
    title: 'Iniciar sesión',
    resolve: {
      layout: setLayout(PageLayout.None),
    },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
