import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {MovieService} from "../services/movie-service";
import {HttpClientModule} from "@angular/common/http";
import {MovieDetailPage} from "../pages/movie-detail/movie-detail";
import {SafePipe} from "../pipes/pipes/pipes";
import {MyWatchListService} from "../services/my-watch-list-service";
import {MyWatchListPage} from "../pages/my-watch-list/my-watch-list-page.component";

@NgModule({
  declarations: [
    MyApp,
    MyWatchListPage,
    ContactPage,
    HomePage,
    TabsPage,
    MovieDetailPage,
    SafePipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyWatchListPage,
    ContactPage,
    HomePage,
    TabsPage,
    MovieDetailPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    MovieService,
    MyWatchListService
  ]
})
export class AppModule {}
