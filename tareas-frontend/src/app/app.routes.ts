import { Routes } from '@angular/router';
import { AppLayout } from './shared/layout/component/app.layout';

export const routes: Routes = [
    {
      path: '',
      component: AppLayout,
      children: [
        { 
          path: 'dashboard', 
          loadComponent: () =>
            import('./modules/dashboard/dashboard.component')
              .then((m) => m.DashboardComponent)
        },
        { 
          path: 'tareas', 
          loadComponent: () => import('./modules/tareas/UI/pages/index-tareas/index-tareas.component')
            .then((m) => m.IndexTareasComponent) 
        }
      ]
    },
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: 'dashboard' }
  ];








