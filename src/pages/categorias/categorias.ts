import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MaestroPage} from "../maestro/maestro";
import {NuevaRecetaPage} from "../nueva-receta/nueva-receta";

@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html'
})
export class CategoriasPage {



  constructor(public navCtrl: NavController) {
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
}
