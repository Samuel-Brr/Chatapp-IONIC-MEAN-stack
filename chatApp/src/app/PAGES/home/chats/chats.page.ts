import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { ApiService } from 'src/app/SERVICES/api.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  constructor(private api: ApiService ) { }

  ngOnInit() {
    this.getAllChats()
  }

  getAllChats(){
    this.api.getChats()
      .pipe(
        tap(chats => console.log(chats))
      )
      .subscribe()
  }

}
