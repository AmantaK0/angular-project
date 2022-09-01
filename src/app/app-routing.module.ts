import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ChartComponent } from './chart/chart.component';
import { CreateTicketComponent } from './dashboard/create-ticket/create-ticket.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ViewTicketComponent } from './dashboard/view-ticket/view-ticket.component';
import { AdminGuard } from './shared/guards/admin.guard';
import { AuthGuard } from './shared/guards/auth.guard';
import { LoggedInGuard } from './shared/guards/loggedIn.guard';

const routes: Routes = [
  { path: '', redirectTo: '', pathMatch: 'full' },
  { path: 'chart', component: ChartComponent },
  { path: 'signin', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'signup', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [LoggedInGuard] },
  { path: 'create-ticket', component: CreateTicketComponent, canActivate: [LoggedInGuard, AdminGuard] },
  { path: 'ticket/:id', component: ViewTicketComponent, canActivate: [LoggedInGuard] }
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
