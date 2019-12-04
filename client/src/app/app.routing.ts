import { ModuleWithProviders } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { InicioComponent } from './inicio/inicio.component';

const appRoutes: Routes = [
    {path: '', component: InicioComponent},
    //{path: '', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: '**', component: LoginComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);