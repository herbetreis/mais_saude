import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./auth/register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'new-meal',
    loadChildren: () => import('./meals/new-meal/new-meal.module').then(m => m.NewMealPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'user-settings',
    loadChildren: () => import('./settings/user-settings/user-settings.module').then(m => m.UserSettingsPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'add-food',
    loadChildren: () => import('./meals/add-food/add-food.module').then(m => m.AddFoodPageModule),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
