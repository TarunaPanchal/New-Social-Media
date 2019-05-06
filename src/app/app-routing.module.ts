import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationComponent } from './registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MyNetworkComponent } from './my-network/my-network.component';
import { MessageComponent } from './message/message.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthServiceService as AuthGuard } from './Services/auth-service.service';
import { ListComponent } from './list/list.component';
import { RoleandpermissionComponent } from './roleandpermission/roleandpermission.component';
const routes: Routes = [
  {
    path : 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegistrationComponent
  },
  {
    path : 'admin',
    component : AdminComponent
  },
  {
    path : 'list',
    component: ListComponent
  },
  {
    path : 'roleandpermission',
    component: RoleandpermissionComponent
  },
  {
    path: 'home',
    component: HomepageComponent
  },
  {
    path: 'network',
    component: MyNetworkComponent
  },
  {
    path: 'message',
    component: MessageComponent
  },
  {
    path: 'notification',
    component: NotificationComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: '**',
    redirectTo: '/login'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
