import { ModuleWithProviders } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { InicioComponent } from './inicio/inicio.component';
import { PagosComponent } from './pagos/pagos.component';
import { AyudaComponent } from './ayuda/ayuda.component';

const appRoutes: Routes = [
    {path: '', component: LoginComponent},
    {path: 'index', component: InicioComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'pagos', component: PagosComponent},
    {path: 'ayuda', component: AyudaComponent},
    {path: '**', component: LoginComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);