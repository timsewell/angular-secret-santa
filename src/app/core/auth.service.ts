import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';

@Injectable()

export class AuthService {

    public loggedIn = false;

    constructor(
        public afAuth: AngularFireAuth
    ) {
        this.loggedIn = !!sessionStorage.getItem('user');
    }

    doLogin(value) {
        return new Promise<any>((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(value.email, value.password)
                .then(res => {
                    if (res.user) {
                        sessionStorage.setItem('user', JSON.stringify({
                            email: res.user.email
                        }));
                    }
                    resolve(res);
                }, err => reject(err));
        });
    }

    doLogout() {
        return new Promise((resolve, reject) => {
            if (firebase.auth().currentUser) {
                this.afAuth.auth.signOut();
                sessionStorage.removeItem('user');
                resolve();
            }
            else {
                reject();
            }
        });
    }

    isLoggedIn() {
        return !!sessionStorage.getItem('user');
    }

}
