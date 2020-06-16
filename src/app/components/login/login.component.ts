import { Component } from '@angular/core';
import { ChatService } from '../../services/chat.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent{

  constructor( private chatService:ChatService ) { }
  logIn(social:string){
    console.log(social);
    this.chatService.login(social); 
    
  }
}
