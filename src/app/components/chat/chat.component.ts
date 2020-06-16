import { Component, OnInit} from '@angular/core';
import { ChatService } from '../../services/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit{
  message:string = "";
  element:any;
  
  constructor( private chatService:ChatService ) { 
    this.chatService.loadMessages().subscribe(()=>{
      setTimeout(() => {
        this.element.scrollTop = this.element.scrollHeight;
      }, 20);
      
    })
  }

  ngOnInit(){

    this.element = document.getElementById('app-mensajes');
    // console.log(this.element);
    // console.log(this.element.scrollTop);
    // console.log(this.element.scrollHeight);
    
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
