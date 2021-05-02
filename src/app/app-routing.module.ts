import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApiEExemplosComponent } from './api-e-exemplos/api-e-exemplos.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardUsersComponent } from './user/components/dashboard/dashboard.component';
import { AllProfileComponent } from './user/components/all-profile/all-profile.component';
import { ProfileComponent } from './user/components/profile/profile.component';
import { RegisterComponent } from './user/components/register/register.component';
import { UpdateComponent } from './user/components/update/update.component';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from 'src/app/user/page/home/home.component';
import { LoginComponent } from 'src/app/user/page/login/login.component';

import { AuthGuard } from './guards/guards.component';

const routes: Routes = [
  {
    path: '', pathMatch: 'full', redirectTo: 'login'
  },

  {
    path: 'login', component: LoginComponent
  },  
  {
    path: 'home', component: HomeComponent, 
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardUsersComponent
      },
      {
        path: 'usersAll',
        component: AllProfileComponent
      },
      {
        path: 'user',
        component: ProfileComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'update',
        component: UpdateComponent
      }
    ]
  },
  {
    path: 'main', component: NavigationComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'api-e-exemplos',
        component: ApiEExemplosComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
