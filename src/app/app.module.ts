import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './pages/app/app.component';
import { EntrarComponent } from './pages/entrar/entrar.component';
import { HomeComponent } from './modules/orgao-responsavel/pages/home/home.component';
import { MaterialModule } from './shared/modules/material/material.module';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from '../environments/environment';

import * as firebase from 'firebase/app';

firebase.initializeApp(environment.firebase);

@NgModule({
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        SharedModule,
        MaterialModule,
        AngularFireAuthModule
    ],
    declarations: [
        AppComponent,
        EntrarComponent,
        HomeComponent
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
