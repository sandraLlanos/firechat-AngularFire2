import { Component} from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent{
  message:string = "";
  
  constructor() { }

  send_message(){
    console.log(this.message);    
  }
}
