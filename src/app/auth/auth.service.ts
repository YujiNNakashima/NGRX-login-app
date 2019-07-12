import { User } from './user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import * as firebase from 'firebase';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore
    ) { }

  initAuthListener() {
    this.afAuth.authState.subscribe( (fbUser: firebase.User) => {
      console.log(fbUser);
    })
  }

  crearUsuario(name, email, password) {

    this.afAuth.auth
    .createUserWithEmailAndPassword(email, password)
    .then(resp => {
      
      const user: User = {
        uid: resp.user.uid,
        name: name,
        email: resp.user.email
      }

      this.afDB
      .doc(`${ user.uid }/usuario`)
      .set(user)
      .then(() => {
        this.router.navigate(['/']);  
      })
    })
    .catch(error => {
      console.error(error);
      Swal.fire('Erro no login', error.message, 'error')
    })

  }

  login( email: string, password: string) {
    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        console.log(res);
        this.router.navigate(['/']);
      })
      .catch(error => {
        console.error(error);
        Swal.fire('Erro no login', error.message, 'error')
      })
  }

  logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  isAuth() {
    return this.afAuth.authState
    .pipe(
      //retorna true se user existir;
      map( fbUser => {

        if(fbUser == null) {
          this.router
        }
        
        return fbUser != null;
      })
    )
  }


}
