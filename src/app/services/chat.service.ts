import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Message } from '../interfaces/message.interface';
import { map } from 'rxjs/operators'; 
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Message>;
  public chats:Message[] = [];
  user:any = {};
  // ejemplo:any[]=[3,5,6,8,7,9,4,2,1];
  // recibeEjemplo=[];
  constructor( private afs: AngularFirestore,
               public afAuth: AngularFireAuth ) {
    // Para comprender mejor unshift()
    // console.log(this.ejemplo);
    // this.ejemplo.sort((a,b)=>{
    //   return b - a;
    // })
    // console.log(this.ejemplo);
    // for (const iterator of this.ejemplo) {
    //   this.recibeEjemplo.unshift(iterator);
    //   console.log(this.recibeEjemplo);      
    // }
    this.afAuth.authState.subscribe(user =>{
      console.log(user);

      if(!user){
        return;
      }
      this.user.name = user.displayName;
      this.user.uid = user.uid;
      console.log(this.user);
      
    })
   }
  login(social:string) {
    if (social === 'google') {
      this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } else {
      this.afAuth.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider());
    }
  }
  logout() {
    // se reestablece el usuario
    this.user = {};
    this.afAuth.auth.signOut();
  }
  loadMessages(){
    this.itemsCollection = this.afs.collection<Message>('chats', ref => ref.orderBy('date','desc')
                                                                           .limit(5));
    return this.itemsCollection.valueChanges()
                               .pipe(map( (messages:Message[]) => {
                                 console.log(messages); 

                                 this.chats = [];                               

                                 for (const message of messages) {
                                   this.chats.unshift(message);                                   
                                 }

                                 return this.chats;
                                                             
                               }))
  }
  addMessage(text:string){

    let message:Message = {
      name: this.user.name,
      message: text,
      date: new Date().getTime(),
      uid: this.user.uid
    }

    return this.itemsCollection.add(message);
  }
}
