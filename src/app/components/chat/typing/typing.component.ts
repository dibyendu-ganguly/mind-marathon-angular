import { JsonPipe } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { ChatService } from '../../../services/chat.service';
import { ChatConstants } from '../../../constants/chat.constants';

   
@Component({
  selector: 'app-typing',
  standalone: true,
  imports: [],
  templateUrl: './typing.component.html',
  styleUrl: './typing.component.scss'
})
export class TypingComponent implements OnInit {
  
  typers = signal('');//this.userList().join(', ')
  typerCount = signal(0);
  chatService = inject(ChatService);
  ngOnInit(): void {
    this.chatService.getTypingNotification().subscribe({
      next: data => {
        console.log(data);
        const typerShownLimit = ChatConstants.TypingUserShownLimit;
        this.typerCount.set(data.length);
        if(data.length>typerShownLimit){
          this.typers.set(data.slice(0,typerShownLimit).join(',') + ` +${(data.length - typerShownLimit )}` )
        } else{
          this.typers.set(data.join(', '));
        }
      },
    })
  }

}
