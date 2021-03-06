import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';
import {DetallePage} from "../detalle/detalle";
//import { FirebaseListObservable} from "angularfire2/database-deprecated";

@Component({
  selector: 'page-maestro',
  templateUrl: 'maestro.html'
})
export class MaestroPage {

  public recetas  : FirebaseListObservable<any[]>;
  private categoria : string;

  constructor(public navCtrl: NavController,
              public param: NavParams,
              private angFireDatabase : AngularFireDatabase) {

    //this.recetas = this.angFireDatabase.list('/recetas')
    this.categoria = param.get("categoriaSeleccionada");
    console.log('constructorMaestro Parametro recibido: ' + this.categoria);
    this.recetas = this.angFireDatabase.list('/recetas',{
      query:{
        orderByChild: 'Categoria',
        equalTo: this.categoria
      }
    });
  }


  goToDetalle(receta) {
    console.log("Metodo goToDetalle");
    //console.log("Receta seleccionada: " + receta.toString());
    this.navCtrl.push(DetallePage, {
      recetaSeleccionada: receta})
  }


}
