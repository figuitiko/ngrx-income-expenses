import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {map} from "rxjs/operators";
import {User} from "../models/user.model";
import {AngularFirestore} from "@angular/fire/firestore";
import {Store} from "@ngrx/store";
import {AppState} from "../app.reducer";
import * as auth from "../auth/auth.action";
import {Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubscription: Subscription;
  constructor(public auth: AngularFireAuth,
              private firestore: AngularFirestore,
              private store: Store<AppState>) { }

  initAuthListener(){
    this.auth.authState.subscribe(fUser=>{

      if(fUser){
       this.userSubscription= this.firestore.doc(`${fUser.uid}/user`).valueChanges()
          .subscribe((firestoreUser:any) =>{
            const user = User.fromFiresBase(firestoreUser);
            this.store.dispatch(auth.setUser({user}));
          })


      }else{
        this.userSubscription.unsubscribe();
        this.store.dispatch(auth.unSetUser());
      }

    })
  }

  createUser(name:string, email: string, password: string){
   return this.auth.createUserWithEmailAndPassword(email,password )
     .then(({user})=>{
       const newUser = new User(user.uid, name, user.email);
      return  this.firestore.doc(`${user.uid}/user`).set({...newUser});


     })

  }
  loginUser(email: string, password: string){
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  logout(){
    return this.auth.signOut();
  }
  isAuth(){
    return this.auth.authState.pipe(
        map(fbUser=> fbUser !== null)
    );
  }
}
