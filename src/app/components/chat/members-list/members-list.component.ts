import { Component, inject, OnInit } from '@angular/core';
import { ChatService } from '../../../services/chat.service';

@Component({
    selector: 'app-members-list',
    imports: [],
    templateUrl: './members-list.component.html',
    styleUrl: './members-list.component.scss'
})
export class MembersListComponent implements OnInit{
  chatService = inject(ChatService);
  membersList: string[] = [];
  ngOnInit(): void {
    this.chatService.getRoomJoinNotification().subscribe({
      next: (data)=> {
        console.log(data);
        this.membersList = data;
      }
    })
  }
}
