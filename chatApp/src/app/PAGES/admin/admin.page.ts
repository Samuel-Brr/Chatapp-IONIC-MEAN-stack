/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Chat } from 'src/app/MODELS/chat.model';
import { ApiService } from 'src/app/SERVICES/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  private subject = new BehaviorSubject<Chat[]>([]);
  chatArr$: Observable<Chat[]> = this.subject.asObservable();

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getAllChats();
    console.log('All chats: ', this.chatArr$);
  }

  getAllChats(){
    this.api.getChats()
      .pipe(
        catchError(err => throwError(() => {
            new Error(err);
            alert('Unable to get list of chats');
          })),
        tap(chats => {
          this.subject.next(chats);
        })
      )
      .subscribe();
    console.log(this.chatArr$);
  }

  messagesTotal(){
    let count = 0;

    this.chatArr$
      .pipe(
        tap(chats => {

          chats.forEach(chat => count += chat.messages.length);

        })
      )
      .subscribe();

    return count;
  }


}
