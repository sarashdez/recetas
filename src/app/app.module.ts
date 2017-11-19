import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { MyApp } from './app.component';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AutenticacionProvider } from '../providers/autenticacion/autenticacion';
import { AngularFireAuthModule } from "angularfire2/auth";
import {MisRecetasPage} from "../pages/mis-recetas/mis-recetas";
import {CategoriasPage} from "../pages/categorias/categorias";
import {NuevaRecetaPage} from "../pages/nueva-receta/nueva-receta";
import {MaestroPage} from "../pages/maestro/maestro";
import {DetallePage} from "../pages/detalle/detalle";
import {environment} from "../environments/environment";


@NgModule({
  declarations: [
    MyApp,
    MisRecetasPage,
    CategoriasPage,
    NuevaRecetaPage,
    MaestroPage,
    DetallePage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MisRecetasPage,
    CategoriasPage,
    NuevaRecetaPage,
    MaestroPage,
    DetallePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AutenticacionProvider
  ]
})
export class AppModule {}
