import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';
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
              public alertCtrl: AlertController,
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

  confirmacionEliminar() {
    console.log("Metodo confirmacionEliminar()");
    let confirm = this.alertCtrl.create({
      title: 'Eliminar Receta',
      message: '¿Seguro que quieres eliminar esta receta? Una vez eliminada no podrás recuperarla. (Solo podrás eliminar la receta si dispones de conexión a Internet).',
      buttons: [
        {
          text: 'Mejor no',
          handler: () => {
            console.log('"Mejor no" pulsado');
          }
        },
        {
          text: 'Sí, elimínala',
          handler: () => {
            console.log('"Sí, elimínala" pulsado');
            this.deleteReceta();
          }
        }
      ]
    });
    confirm.present();
  }

}
