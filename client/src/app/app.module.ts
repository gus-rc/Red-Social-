import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
//import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http'; 
import {routing, appRoutingProviders} from './app.routing';


//cargar componentes
import { AppComponent } from './app.component';
import {LoginComponent} from './components/login/login.component';
import {RegisterComponent} from  './components/register/register.component';
import {HomeComponent } from './components/home/home.component';
import {UserEditComponent} from './components/user-edit/user-edit.component';
//import {MatButtonModule, MatButtonToggleModule, MatIconModule} from '@angular/material';
import {UsersComponent} from './components/users/users.component';
import {SidebarComponent} from './components/sidebar/sidebar.component';

const MaterialComponents =[
 /* MatButtonModule,
  MatButtonToggleModule,
  MatIconModule*/
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    UserEditComponent,
    UsersComponent,
    SidebarComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
 HttpClientModule,

MaterialComponents

    
  ],
  exports:[MaterialComponents],

  providers: [
    appRoutingProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
