import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Message } from '../interfaces/message.interface';
import { map } from 'rxjs/operators'; 

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private itemsCollection: AngularFirestoreCollection<Message>;
  public chats:Message[] = [];
  // ejemplo:any[]=[3,5,6,8,7,9,4,2,1];
  // recibeEjemplo=[];
  constructor( private afs: AngularFirestore ) {
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
      name: 'Demo',
      message: text,
      date: new Date().getTime()
    }

    return this.itemsCollection.add(message);
  }
}
