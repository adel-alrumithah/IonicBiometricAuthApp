import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';

import { LoginPageModule } from './login/login.module';
import { SplashScreen } from '@ionic-native/splash-screen';


@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    LoginPageModule
  ],
  providers: [
    FingerprintAIO,
    StatusBar,
    SplashScreen,
    {
      provide: RouteReuseStrategy, useClass: IonicRouteStrategy
    }],
  bootstrap: [AppComponent],
})
export class AppModule { }
