import { Injectable, NgZone } from '@angular/core';
import { User } from '../../interfaces/user';
import * as auth from 'firebase/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { newUserForm } from 'src/app/interfaces/newUserForm';
import { MatSnackBar } from '@angular/material/snack-bar';
import { first } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usersDb!: AngularFireList<any>;
  user!: AngularFireObject<any>;
  userInfo!: User;
  // public currentUser!: Observable<firebaseUser.User>;

  constructor(public afStore:AngularFirestore, public afAuth: AngularFireAuth, private router: Router, private snackBar: MatSnackBar) {
    // this.currentUser = this.afAuth.authState.pipe(filter((user: firebaseUser.User | null): user is firebaseUser.User => !!user));
    // this.currentUser.subscribe(x => this.uid = x.uid);
  }

  signUp(userData: newUserForm) {
    this.afAuth.createUserWithEmailAndPassword(userData.email, userData.password)
      .then((result: any) => {
        let id = result.user.uid;
        this.afStore.collection('/accounts').doc(id).set({
          username: userData.username,
          email: userData.email,
          type: userData.type
          }).catch(error => {
            console.log(error);
        })
        this.snackBar.open("Account created", "Close");
        this.router.navigate(["/signin"]);
    }).catch(e => {
      this.snackBar.open("Email already in use", "Close");
    })
  }
  signIn(loginForm: any){
      this.afAuth.signInWithEmailAndPassword(loginForm.email, loginForm.password).then(result=>{
      let id = result.user?.uid;
      this.afStore
        .collection<User>('/accounts')
        .doc(id)
        .valueChanges({idField: 'propertyId'})
        .pipe(first())
        .subscribe((e) => {
          let info = {
            username: e?.username,
            email: e?.email,
            type: e?.type,
          };
          localStorage.setItem('user', JSON.stringify(info));
          localStorage.setItem('id', id as string)
          localStorage.setItem('isLoggedIn', 'true');
          this.router.navigate(['']);
          });
      }).catch(error => {
        this.snackBar.open("Invalid email or password", "Close");
      });
    }

    signOut(){
      this.afAuth.signOut().then( () =>{
        localStorage.clear();
        this.router.navigate(["login"]);
      });
    }

    isAuthenticated(){
      return !!localStorage.getItem('isLoggedIn');
    }

    isAdmin(){
      if(localStorage.getItem('user') === null) return false
      return JSON.parse(localStorage.getItem('user')!).type === "admin"
    }

    getUserInfo(){
      this.userInfo = JSON.parse(localStorage.getItem('user')!);
      return this.userInfo;
    }
    
    generatePatientName(name: string, date: Date): string{
      let newdate = new Date(date);
      return name.toUpperCase() + ' ' + '(' + (newdate.getDate() + '.' + (newdate.getMonth()+1) + '.' + newdate.getFullYear()) + ')';
    }
}



