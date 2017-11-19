import { Component } from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";

@Component({
  selector: 'page-detalle',
  templateUrl: 'detalle.html'
})
export class DetallePage {

  private receta;
  public recetas  : FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController,
              param: NavParams,
              private angFireDatabase : AngularFireDatabase) {
    this.receta = param.get("recetaSeleccionada");
    console.log("constructorDetalle Parametro recibido: " + this.receta.Nombre);
    this.recetas = this.angFireDatabase.list('/recetas');


  }

  deleteReceta() {
    console.log("Metodo deleteReceta");
    console.log("Receta a eliminar: " + this.receta.Nombre);
    this.recetas.remove(this.receta)
      .then( newReceta => {
        this.navCtrl.pop();
      }, error => {
      console.log(error);
    });
  }

}
