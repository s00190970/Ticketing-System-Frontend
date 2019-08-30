import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './modules/home/home.component';
import { AdminComponent } from './modules/admin/admin.component';
import { LoginComponent } from './modules/authentication/login/login.component';
import { RegisterComponent } from './modules/authentication/register/register.component';
import { CreateTicketComponent } from './modules/create-ticket/create-ticket.component';
import { EditTicketComponent } from './modules/edit-ticket/edit-ticket.component';
import { AuthenticatedGuardService } from './core/guards/authenticated-guard.service';
import { AdminGuardService } from './core/guards/admin-guard.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthenticatedGuardService]
  },
  {
    path: 'redirect-to-login',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'create-ticket',
  component: CreateTicketComponent,
  canActivate: [AuthenticatedGuardService]
  },
  {
    path: 'edit-ticket',
    component: EditTicketComponent,
    canActivate: [AuthenticatedGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
