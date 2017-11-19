import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MaestroPage} from "../maestro/maestro";

@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html'
})
export class CategoriasPage {



  constructor(public navCtrl: NavController) {
  }

  goToMaestro(categoria: string) {
    console.log('goToMaestro Correcto');
    console.log('Categoria seleccionada: ' + categoria);
    this.navCtrl.push(MaestroPage, {
      categoriaSeleccionada: categoria});
  }
}
