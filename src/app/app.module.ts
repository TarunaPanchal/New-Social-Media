import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule,FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { DashboardComponent } from './dashboard/dashboard.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MyNetworkComponent } from './my-network/my-network.component';
import { MessageComponent } from './message/message.component';
import { NotificationComponent } from './notification/notification.component';
import { ProfileComponent } from './profile/profile.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import {AuthServiceService} from './Services/auth-service.service';
import{UserService} from './Services/user.service';
import { PostService } from './Services/post.service';
import{FriendService} from './Services/friend.service';
import { AdminComponent } from './admin/admin.component';
import { AdminheaderComponent } from './adminheader/adminheader.component';
import { ListComponent } from './list/list.component';

import { RoleandpermissionComponent } from './roleandpermission/roleandpermission.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    HomepageComponent,
    MyNetworkComponent,
    MessageComponent,
    NotificationComponent,
    ProfileComponent,
    RegistrationComponent,
    LoginComponent,
    AdminComponent,
    AdminheaderComponent,
    ListComponent,
    RoleandpermissionComponent,
    LogoutComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot()
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [
    AuthServiceService,
    UserService,
    PostService,
    FriendService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
