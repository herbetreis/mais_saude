import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';

const CREDENTIALS = {
  apiKey: 'AIzaSyAGA1fwyTCgCJfHDRukP-vle8UQSlyF9GE',
  authDomain: 'mais-saude-26cce.firebaseapp.com',
  projectId: 'mais-saude-26cce',
  storageBucket: 'mais-saude-26cce.appspot.com',
  messagingSenderId: '790784702757',
  appId: '1:790784702757:web:f2042e4035ea981860c2cc',
  measurementId: 'G-EHKLKX62BL'
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(CREDENTIALS),
    AngularFireAuthModule
  ],
  providers: [AuthService, { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent]
})
export class AppModule {}
