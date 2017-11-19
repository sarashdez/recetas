import { Component } from '@angular/core';
import {NavController, NavParams, Platform} from 'ionic-angular';
import { FirebaseListObservable, AngularFireDatabase  } from 'angularfire2/database';
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
              private platform  : Platform,
              private angFireDatabase : AngularFireDatabase) {

    //this.recetas = this.angFireDatabase.list('/recetas')
    this.categoria = param.get("categoriaSeleccionada");
    console.log('constructorMaestro Parametro recibido: ' + param);
    this.recetas = this.angFireDatabase.list('/recetas',{
      query:{
        orderByChild: 'Categoria',
        equalTo: this.categoria
      }
    });
    console.log('Recetas despues de query');
  }




  goToDetalle() {
    console.log("Metodo goToDetalle");
  }

}
