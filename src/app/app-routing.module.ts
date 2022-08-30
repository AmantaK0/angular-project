import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { CreateTicketComponent } from './dashboard/create-ticket/create-ticket.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewTicketComponent } from './dashboard/view-ticket/view-ticket.component';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'signin', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'create', component: CreateTicketComponent },
  { path: 'ticket/:id', component: ViewTicketComponent }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
