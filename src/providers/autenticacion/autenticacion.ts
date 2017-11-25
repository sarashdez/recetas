import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs/Observable";



@Injectable()
export class AutenticacionProvider {

  public user : Observable<any>;


  constructor(public http: Http,
              private _ANGFIRE: AngularFireAuth) {
    this.user = this._ANGFIRE.authState;

    console.log('Hello AutenticacionProvider');
  }

  //Metodo LOGIN().
  loginAutenticacion(email: string, password: string) : Promise<any> {
    return new Promise((resolve, reject) => {
      this._ANGFIRE
        .auth.signInWithEmailAndPassword(email, password)
        .then((val: any) => {
            resolve();
        })
        .catch((err: any) => {
            reject(err);
        });
      });
  }

  //Metodo SIGNUP().
  signUp(email: string, password: string) : Promise<any> {
    return new Promise((resolve, reject) => {
      this._ANGFIRE
        .auth.createUserWithEmailAndPassword(email, password)
        .then((val: any) => {
          resolve();
        })
        .catch((err: any) => {
          reject(err);
        });
    });
  }

  //Metodo LOGOUT().
  logOut() : Promise<any> {
    return new Promise ((resolve, reject) => {
      this._ANGFIRE.auth.signOut()
        .then((data:any) => {
          resolve(data);
        })
        .catch((error : any) => {
          reject(error);
        });
      });
  }


}
