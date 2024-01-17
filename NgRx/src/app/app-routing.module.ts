import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { authGuardGuard } from './auth-guard.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'counter',
    loadChildren: () =>
      import('./counter/counter.module').then((m) => m.CounterModule),
  },
  {
    path: 'students',
    loadChildren: () =>
      import('./student/student.module').then((m) => m.StudentModule),
      canActivate: [authGuardGuard]
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
