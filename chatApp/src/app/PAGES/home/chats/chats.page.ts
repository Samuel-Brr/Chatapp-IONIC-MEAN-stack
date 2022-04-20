import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, tap, Observable, catchError, throwError } from 'rxjs';
import { Chat } from 'src/app/MODELS/chat.model';
import { ApiService } from 'src/app/SERVICES/api.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  private subject = new BehaviorSubject<Chat[]>([]);
  chatArr$: Observable<Chat[]> = this.subject.asObservable()

  constructor(private api: ApiService ) { }

  ngOnInit() {
    this.getAllChats()
  }

  getAllChats(){
    this.api.getChats()
      .pipe(
        catchError(err => {
          return throwError(() => {
            new Error(err)
            alert("Unable to get list of chats")
          })
        }),
        tap(chats => {
          this.subject.next(chats)
        })
      )
      .subscribe();
    console.log(this.chatArr$)
  }

}
