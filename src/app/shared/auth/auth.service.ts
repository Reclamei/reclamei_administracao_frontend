import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth';
import {UserCredential} from '@firebase/auth-types';
import {BehaviorSubject} from 'rxjs';
import {ActionCodeSettings, user} from '@angular/fire/auth';
import firebase from 'firebase/compat';
import User = firebase.User;

@Injectable({ providedIn: 'root' })
export class AuthService {

    private userSubject = new BehaviorSubject<any>(null);

    constructor(private afAuth: AngularFireAuth) {
    }

    public getAngularFireAuth(): AngularFireAuth {
        return this.afAuth;
    }

    public setUserSubject(userCredential: any) {
        sessionStorage.setItem('user', JSON.stringify(userCredential));
        this.userSubject.next(userCredential);
    }

    public signInWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
        return this.afAuth.signInWithEmailAndPassword(email, password);
    }

    public createUserWithEmailAndPassword(email: string, password: string): Promise<UserCredential> {
        return this.afAuth.createUserWithEmailAndPassword(email, password);
    }

    public sendPasswordResetEmail(email: string, actionCodeSettings?: ActionCodeSettings): Promise<void> {
        return this.afAuth.sendPasswordResetEmail(email, actionCodeSettings);
    }

    public sendSignInLinkToEmail(email: string, actionCodeSettings?: ActionCodeSettings): Promise<void> {
        return this.afAuth.sendSignInLinkToEmail(email, actionCodeSettings);
    }

    public isSignInWithEmailLink(): Promise<boolean> {
        return this.afAuth.isSignInWithEmailLink(window.location.href);
    }

    public getCurrentUser(): Promise<User> {
        return this.afAuth.currentUser;
    }

    public signOut(): Promise<void> {
        sessionStorage.clear();
        localStorage.clear();
        this.userSubject.next(user);
        return this.afAuth.signOut();
    }

}
