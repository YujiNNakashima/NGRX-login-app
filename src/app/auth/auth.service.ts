import { loadingAction, finishedLoadingAction } from './../shared/ui.actions';
import { AppState } from './../app.reducer';
import { User, IUser } from './user.model';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';

import { Router } from '@angular/router';

import Swal from 'sweetalert2';

import * as firebase from 'firebase';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { SetUserAction } from './auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subscription: Subscription = new Subscription();

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private afDB: AngularFirestore,
    private store: Store<AppState>
    ) { }

  initAuthListener() {
    this.subscription = this.afAuth.authState.subscribe( (fbUser: firebase.User) => {
      if(fbUser) {
        this.afDB.doc(`${fbUser.uid}/usuario`).valueChanges()
          .subscribe((usuarioObj: IUser) => {
            const newUser = new User(usuarioObj);
            this.store.dispatch( new SetUserAction(newUser) )
          })
      } else {
        this.subscription.unsubscribe();
      }
    })
  }

  crearUsuario(name, email, password) {

    this.store.dispatch(new loadingAction());

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

      this.store.dispatch(new finishedLoadingAction());

    })
    .catch(error => {
      Swal.fire('Erro no login', error.message, 'error');
      this.store.dispatch(new finishedLoadingAction());

    })

  }

  login( email: string, password: string) {

    this.store.dispatch(new loadingAction());

    this.afAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(res => {
        this.store.dispatch(new finishedLoadingAction());

        this.router.navigate(['/']);
      })
      .catch(error => {
        this.store.dispatch(new finishedLoadingAction());
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