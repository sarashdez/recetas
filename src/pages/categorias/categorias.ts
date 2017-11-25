import { Component } from '@angular/core';
import {AlertController, LoadingController, NavController} from 'ionic-angular';
import {MaestroPage} from "../maestro/maestro";
import {NuevaRecetaPage} from "../nueva-receta/nueva-receta";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";
import {DatabaseService} from "../../providers/sqlite/sql_database";

@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html'
})
export class CategoriasPage {

  public recetas  : FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private angFireDatabase : AngularFireDatabase,
              private sqlDB : DatabaseService) {
    this.recetas = this.angFireDatabase.list('/recetas', {preserveSnapshot: true});
  }

  goToMaestro(categoria: string) {
    console.log('Metodo goToMaestro');
    console.log('Categoria seleccionada: ' + categoria);
    this.navCtrl.push(MaestroPage, {
      categoriaSeleccionada: categoria});
  }

  goToNuevaReceta() {
    console.log("Metodo goToNuevaReceta");

    let alert = this.alertCtrl.create ({
      title: '¡Aviso!',
      subTitle: 'Solo se podrán añadir recetas si dispones de conexión a Internet.',
      buttons: [{
        text: 'Entendido',
        handler: data => {
          this.navCtrl.push(NuevaRecetaPage);
        }
      }]
    });

    alert.present();
  }

  sincronizarDatos() {
    console.log("Metodo sincronizarDatos");
    this.presentarLoading();
    //Recorrer el array de recetas, coger cada objeto(receta) y añadirlo a la base de datos sqlite.
    this.recetas.subscribe(receta => {
      this.sqlDB.addRecetaDB(receta);
    });

  }

  mostrarConfirmacion() {
    console.log("Metodo mostrarConfirmacion()");
    let confirm = this.alertCtrl.create({
      title: 'Sincronizar datos',
      message: '¿Desea almacenar de forma local las recetas? Seguirá necesitando conexión a la red para poder utilizar correctamente la app.',
      buttons: [
        {
          text: 'Ahora no',
          handler: () => {
            console.log('"Ahora no" pulsado');
          }
        },
        {
          text: 'Sincronizar',
          handler: () => {
            console.log('"Sincronizar" pulsado');
            this.sincronizarDatos();
          }
        }
      ]
    });
    confirm.present();
  }

  presentarLoading() {
    let loader = this.loadingCtrl.create({
      content: "Sincronizando...",
      duration: 3000
    });
    loader.present();
  }

  alertaSinConexion() {
    let alert = this.alertCtrl.create ({
      title: '¡Aviso!',
      subTitle: 'No se pueden añadir recetas si no dispones de conexión a la red.',
      buttons: ['Entendido']
    });

    alert.present();

  }

}
