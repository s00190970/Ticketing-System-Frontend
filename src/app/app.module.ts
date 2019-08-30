import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/authentication/login/login.component';
import { RegisterComponent } from './modules/authentication/register/register.component';
import { AdminComponent } from './modules/admin/admin.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbButtonModule, NbCardModule, NbWindowModule, NbWindowService, NbInputModule, NbSelectModule, NbIconModule, NbCheckboxModule, NbToastrModule, NbAlertModule, NbActionsModule, NbUserModule, NbContextMenuModule, NbMenuService, NbMenuModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClientModule } from '@angular/common/http';
import { TicketService } from './core/services/ticket.service';
import { CreateTicketComponent } from './modules/create-ticket/create-ticket.component'
import { FormsModule } from '@angular/forms';
import { TicketPropertiesService } from './core/services/ticketProperties.service';
import { EditTicketComponent } from './modules/edit-ticket/edit-ticket.component';
import { SettingsService } from './core/services/settings.service';
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken, NbAuthService, NbTokenService, NbTokenStorage, NbTokenLocalStorage, NbUser } from '@nebular/auth';
import { baseUrl } from './commons/constants/constants';
import { AuthenticatedGuardService } from './core/guards/authenticated-guard.service';
import { NbMenuInternalService } from '@nebular/theme/components/menu/menu.service';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminGuardService } from './core/guards/admin-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    CreateTicketComponent,
    EditTicketComponent,
    NavbarComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule,
    NbIconModule,
    NbButtonModule,
    NbCardModule,
    NbWindowModule.forRoot(),
    FormsModule,
    NbInputModule,
    NbSelectModule,
    NbCheckboxModule,
    NbAlertModule,
    NbMenuModule.forRoot(),
    NbActionsModule,
    NbUserModule,
    NbContextMenuModule,
    NbToastrModule.forRoot(),
    NbAuthModule.forRoot({
      strategies:[
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,
            key: 'token'
          },
          baseEndpoint: baseUrl,
          login: {
            endpoint: '/Users/authenticate',
            method: 'post',
            redirect: {
              success: '/home',
              failure: null
            }
          },
          register: {
            endpoint: '/Users/register',
            method: 'post',
            redirect: {
              success: '/home',
              failure: null
            }
          }
        })
      ],
      forms: {}
    })
  ],
  providers: [TicketService, TicketPropertiesService, NbWindowService, SettingsService, NbAuthService, NbTokenService, AuthenticatedGuardService, AdminGuardService, {provide: NbTokenStorage, useClass: NbTokenLocalStorage}, NbMenuService, NbTokenLocalStorage],
  bootstrap: [AppComponent]
})
export class AppModule { }
