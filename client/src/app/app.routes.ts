import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { setLayout } from './core/resolvers/page-layout.resolver';
import { PageLayout } from './core/enums/page-layout';
import { UsersComponent } from './pages/users/users.component';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    component: DashboardComponent,
    title: 'Panel de control',
    resolve: {
      layout: setLayout(PageLayout.Dashboard),
    },
  },
  {
    path: 'users',
    canActivate: [authGuard],
    component: UsersComponent,
    title: 'Usuarios',
    resolve: {
      layout: setLayout(PageLayout.Dashboard),
    },
  },
  {
    path: 'grades',
    canActivate: [authGuard],
    component: DashboardComponent,
    title: 'Grados',
    resolve: {
      layout: setLayout(PageLayout.Dashboard),
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    title: 'Iniciar sesión',
    resolve: {
      layout: setLayout(PageLayout.None),
    },
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
