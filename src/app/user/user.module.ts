import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from "../app-routing.module";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxMaskModule, IConfig } from 'ngx-mask'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomMaterialModule } from '../shared/material.module';
import { HomeComponent } from './page/home/home.component';
import { LoginComponent } from './page/login/login.component';
import { AllProfileComponent } from './components/all-profile/all-profile.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { UpdateComponent } from './components/update/update.component';
import { DashboardUsersComponent } from './components/dashboard/dashboard.component';

import { AuthGuard } from '../guards/guards.component';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  declarations: [
    AllProfileComponent,
    ProfileComponent,
    RegisterComponent,
    UpdateComponent,
    DashboardUsersComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    CustomMaterialModule,
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxMaskModule.forRoot(),
  ],
  providers: [LoginComponent, AuthGuard, AllProfileComponent, ProfileComponent, RegisterComponent, UpdateComponent, DashboardUsersComponent, HomeComponent,],
  bootstrap: []
})
export class UserModule { }
