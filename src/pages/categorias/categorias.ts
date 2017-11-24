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

  //sincronizar
  public recetas  : FirebaseListObservable<any[]>;
  //objeto receta
 /*
  private receta : Object = {
      Categoria: "",
      Ingredientes: "",
      Nombre: "",
      Procedimiento: ""
  };

*/
  constructor(public navCtrl: NavController,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController,
              private angFireDatabase : AngularFireDatabase,
              private sqlDB : DatabaseService) {
    this.recetas = this.angFireDatabase.list('/recetas', {preserveSnapshot: true});
      /*this.recetas
        .subscribe(receta => {
          receta.forEach(receta => {
            console.log(receta.key);
            console.log(receta.val());
          });
        })*/
  }

  goToMaestro(categoria: string) {
    console.log('Metodo goToMaestro');
    console.log('Categoria seleccionada: ' + categoria);
    this.navCtrl.push(MaestroPage, {
      categoriaSeleccionada: categoria});
  }

  goToNuevaReceta() {
    console.log("Metodo goToNuevaReceta");
    this.navCtrl.push(NuevaRecetaPage);
  }

  sincronizarDatos() {
    console.log("Metodo sincronizarDatos");
    this.presentarLoading();
    let index  = 0;
    //Recorrer el array de recetas, coger cada objeto(receta) y añadirlo a la base de datos sqlite.
    this.recetas.subscribe(receta => {
      this.sqlDB.addRecetaDB(receta);
    });

  }

  mostrarConfirmacion() {
    console.log("Metodo mostrarConfirmacion()");
    let confirm = this.alertCtrl.create({
      title: 'Sincronizar datos',
      message: 'Esta app necesita acceso a la red para poder acceder a las recetas almacenadas. Para utilizar la app sin conexión debe sincronizar los datos primero.',
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





}
