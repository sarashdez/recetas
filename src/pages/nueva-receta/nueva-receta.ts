import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AngularFireDatabase, FirebaseListObservable} from "angularfire2/database";

@Component({
  selector: 'page-nueva-receta',
  templateUrl: 'nueva-receta.html'
})
export class NuevaRecetaPage {

  public form           : FormGroup;

  public recetas  : FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController,
              private _FB : FormBuilder,
              private angFireDatabase : AngularFireDatabase) {
    this.recetas = this.angFireDatabase.list('/recetas');
    this.form = this._FB.group({
      'categoria' : [''],
      'nombre'    : [''],
      'ingredientes' : [''],
      'preparacion' : ['']
    })
  }

  addReceta() {
    console.log("Metodo addReceta");

    let categoria : any = this.form.controls['categoria'].value,
      nombre   : any = this.form.controls['nombre'].value,
      ingredientes  : any = this.form.controls['ingredientes'].value,
      procedimiento : any = this.form.controls['preparacion'].value;

    console.log("addReceta Categoria: " + categoria);
    console.log("addReceta Nombre: " + nombre);
    console.log("addReceta Ingredientes: " + ingredientes);
    console.log("addReceta Nombre: " + procedimiento);

    this.recetas.push({
      Categoria: categoria,
      Ingredientes: ingredientes,
      Nombre: nombre,
      Procedimiento: procedimiento

    }).then( newReceta => {
      this.navCtrl.pop();
    }, error => {
      console.log(error);
    });

  }

}
