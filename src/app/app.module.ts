import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// modules
import {AppRoutingModule} from "./app-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
//angular firebase
import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";
import { AngularFireAuthModule} from "@angular/fire/auth";

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncomeExpensesComponent } from './income-expenses/income-expenses.component';
import { StatisticsComponent } from './income-expenses/statistics/statistics.component';
import { DetailComponent } from './income-expenses/detail/detail.component';
import { FooterComponent } from './share/footer/footer.component';
import { NavbarComponent } from './share/navbar/navbar.component';
import { SidebarComponent } from './share/sidebar/sidebar.component';
import { RegisterComponent } from './auth/register/register.component';

import {environment} from "../environments/environment";
import {StoreModule} from "@ngrx/store";
import { appReducers} from "./app.reducer";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    IncomeExpensesComponent,
    StatisticsComponent,
    DetailComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
