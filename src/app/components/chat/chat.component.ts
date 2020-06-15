import { Component} from '@angular/core';
import { ChatService } from '../../services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent{
  message:string = "";
  
  constructor( private chatService:ChatService ) { 
    this.chatService.loadMessages().subscribe( 
    //   (messages:any[]) => {
    //   console.log(messages);      
    // }
    )
  }

  send_message(){
    console.log(this.message); 
    if( this.message.length === 0){
      return;
    }

    this.chatService.addMessage(this.message)
        .then( () => {
          this.message = "";
          console.log('mensaje enviado correctamente')
        })
        .catch( (err) => console.error('error al enviar el mensaje', err)
        )
  }
}
