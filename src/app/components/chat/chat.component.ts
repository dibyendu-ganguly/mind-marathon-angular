import { CdkDrag, CdkDragHandle } from '@angular/cdk/drag-drop';
import { DatePipe, NgTemplateOutlet } from '@angular/common';
import { Component, DestroyRef, ElementRef, inject, Inject, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { AuthService } from './../../services/auth.service';
import { ChatService } from './../../services/chat.service';
import { TypingComponent } from './typing/typing.component';
import { ChatMessageModel } from '../../models/chat.models';
import { A11yModule } from '@angular/cdk/a11y';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject, Subscription } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MembersListComponent } from './members-list/members-list.component';

export interface ChatComponentDialogData {
  isDialog: boolean;
}

@Component({
    selector: 'app-chat',
    imports: [MatDialogModule, MatFormFieldModule, FormsModule, MatInputModule,
        A11yModule,
        MatTooltipModule, MembersListComponent,
        CdkDrag, CdkDragHandle, MatTabsModule, NgTemplateOutlet, TypingComponent, DatePipe
    ],
    templateUrl: './chat.component.html',
    styleUrl: './chat.component.scss'
})
export class ChatComponent implements OnInit {

  newMessage = '';
  previousMessages: ChatMessageModel[] = this.chatService.previousMessages;//[];
  isDialog = this.data.isDialog;
  isSocketConnnected = this.chatService.roomConnected;
  roomId = this.chatService.roomId;
  toJoinRoom = false;
  roomCodeToJoin: string = '';
  private destroyRef = inject(DestroyRef);

  myUserId = this.authService.getUser().name;

  socketServerEventsSubscription !: Subscription;
  newMsgSubscription !: Subscription;

  @ViewChild('chatBodyContainer', { static: false }) commentDetailWrapper!: ElementRef<HTMLElement>;

  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) private data: ChatComponentDialogData,
    private chatService: ChatService,
    private authService: AuthService
  ) {
  }
  ngOnInit(): void {
    this.socketServerEventsSubscription = this.chatService.getSocketServerEvents()
      // .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((message: string) => {
        if (!this.chatService.processingMessage) {
          this.chatService.openSnackBar();
        }
      })

    this.newMsgSubscription = this.chatService.getNewMessage()
      // .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((message: string) => {
        console.log(message);
      })

  }
  createRoom() {
    this.chatService.createRoom(this.myUserId);
  }

  joinRoom() {
    if (this.roomCodeToJoin) {
      this.chatService.joinRoom(this.myUserId, this.roomCodeToJoin);
    }
  }

  leaveRoom() {
    this.chatService.leaveRoom(this.myUserId);
  }
  tabIndex = 0;
  selectedTabChange(event: MatTabChangeEvent) {
    console.log(event)
    this.tabIndex = event.index;
  }
  sendTypingNotification() {
    this.chatService.sendTypingNotification();
  }

  sendMessage() {
    if (this.newMessage) {
      this.chatService.sendMessage(this.newMessage);
      this.newMessage = '';
      const el: HTMLElement = this.commentDetailWrapper.nativeElement;
      setTimeout(() => {
        el.scrollTop = el.scrollHeight;
      }, 500);
    }
  }

  ngOnDestroy(): void {
    this.socketServerEventsSubscription.unsubscribe();
    this.newMsgSubscription.unsubscribe();
  }

}

