import { Component } from '@angular/core';
import { ChatService } from './services/chat.service';

// import { AngularFirestore } from 'angularfire2/firestore';
// import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor( public cs:ChatService){

    // this.cs.logout();

  }

  // este código sería sin hacer uso del servicio, al igual que sus importaciones
  // chats: Observable<any[]>;
  // constructor(db: AngularFirestore) {
  //   this.chats = db.collection('chats').valueChanges();
  // }
}
