import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './GUARDS/admin.guard';
import { AuthGuard } from './GUARDS/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'registration',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./PAGES/home/home.module').then( m => m.HomePageModule),
    canLoad: [AuthGuard]
  },
  {
    path: 'registration',
    loadChildren: () => import('./PAGES/registration/registration.module').then( m => m.RegistrationPageModule)
  },
  {
    path: 'connexion',
    loadChildren: () => import('./PAGES/connexion/connexion.module').then( m => m.ConnexionPageModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('./PAGES/admin/admin.module').then( m => m.AdminPageModule),
    canLoad: [AdminGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
