import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { LoginComponent } from './modules/authentication/login/login.component';
import { RegisterComponent } from './modules/authentication/register/register.component';
import { AdminComponent } from './modules/admin/admin.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbLayoutModule, NbButtonModule, NbCardModule, NbWindowModule, NbWindowService, NbInputModule, NbSelectModule, NbIconModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { HttpClientModule } from '@angular/common/http';
import { TicketService } from './core/services/ticket.service';
import { CreateTicketComponent } from './modules/create-ticket/create-ticket.component'
import { FormsModule } from '@angular/forms';
import { TicketPropertiesService } from './core/services/ticketProperties.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent,
    CreateTicketComponent,
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
  ],
  providers: [TicketService, TicketPropertiesService, NbWindowService],
  bootstrap: [AppComponent]
})
export class AppModule { }
