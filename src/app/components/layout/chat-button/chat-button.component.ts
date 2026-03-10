import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChatComponent } from '../../chat/chat.component';
import { CdkDrag } from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-chat-button',
    imports: [
        CdkDrag
    ],
    templateUrl: './chat-button.component.html',
    styleUrl: './chat-button.component.scss'
})
export class ChatButtonComponent {

  constructor(private dialog: MatDialog) { }
  openChatDialog() {
    this.dialog.open(ChatComponent,
      {
        data: { name: 'this.name()', animal: 'this.animal()' },
        disableClose: true,
        width: '80vw',
        autoFocus: true
      },

    );
  }
}
