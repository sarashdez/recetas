import { Component } from '@angular/core';
import {NavController} from 'ionic-angular';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AutenticacionProvider} from "../../providers/autenticacion/autenticacion";
import {CategoriasPage} from "../categorias/categorias";

@Component({
  selector: 'page-mis-recetas',
  templateUrl: 'mis-recetas.html'
})

export class MisRecetasPage {

  public form           : FormGroup;
  public displayForm    : boolean = true;
  public displayError   : string;


  constructor(public navCtrl: NavController,
              private _FB   : FormBuilder,
              public _AUTH  : AutenticacionProvider)
  {
    this.form = this._FB.group({
      'email'    : [''],
      'password' : ['']
    })
  }


  logIn() {
    let email   : any = this.form.controls['email'].value,
      password  : any = this.form.controls['password'].value;

    console.log('Datos metodo LOGIN: '+ email + ' ' + password );

    this._AUTH.loginAutenticacion(email, password)
      .then((auth: string) => {
        this.form.reset();
        this.displayForm = false;
        this.navCtrl.push(CategoriasPage);
        console.log("Login Correcto");
      })
      .catch((error) => {
        this.displayError = error.message;
        alert("Tienes que introducir un usuario y contraseña válidos.");
        console.log("Error Login");
        console.log(error.message);
      });
  }

  logOut() {
    this._AUTH.logOut()
      .then((val) => {
        this.displayForm = true;
      })
      .catch((error) => {
        this.displayError = error.message;
      });
  }

  crearCuenta() {
    console.log("Metodo crearCuenta()");

    let email   : any = this.form.controls['email'].value,
        password  : any = this.form.controls['password'].value;

    console.log('Datos metodo crearCuenta: '+ email + ' ' + password );

    this._AUTH.signUp(email, password)
      .then((auth: string) => {
        this.form.reset();
        this.displayForm = false;
        alert("¡Tu cuenta ha sido creada!");
        console.log("crearCuenta Correcto");
      })
      .catch((error) => {
        this.displayError = error.message;
        alert("Tienes que introducir un usuario y contraseña válidos.");
        console.log("Error crearCuenta");
        console.log(error.message);
      });


  }
}
