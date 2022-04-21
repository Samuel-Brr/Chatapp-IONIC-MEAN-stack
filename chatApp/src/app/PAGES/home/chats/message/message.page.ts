import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject, tap, Subscription } from 'rxjs';
import { Chat } from 'src/app/MODELS/chat.model';
import { CreateMessage } from 'src/app/MODELS/createMessage.model';
import { ApiService } from 'src/app/SERVICES/api.service';
import { TabsService } from './../../../../SERVICES/tabs.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  chat

  private subject = new BehaviorSubject<Chat | null>(null);
  chatData$: Observable<Chat | null> = this.subject.asObservable();
  chatData
  subscription: Subscription



  constructor(private route: ActivatedRoute,
      private api: ApiService,
      private router: Router,
      private tabsService: TabsService) {

        this.route.queryParams
          .pipe(
            tap(params => {
              if(this.router.getCurrentNavigation().extras.state){
                this.subject.next(this.router.getCurrentNavigation().extras.state.chat)
                this.chatData = this.router.getCurrentNavigation().extras.state.chat
              }
              console.log(this.chatData$)
            })
          )
          .subscribe()

        // this.route.queryParams.subscribe(params=>{
        //   if(this.router.getCurrentNavigation().extras.state){
        //   this.data =this.router.getCurrentNavigation().extras.state.chat;
        //   console.log('data ', this.data)
        //   }
        // })

      }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.tabsService.toggleTabs()
  }

  ionViewWillLeave(){
    this.tabsService.toggleTabs()
  }

  getDate(){
    return new Date()
  }

  onPostMessage(){
    const user = JSON.parse(this.api.getUser())
    const newMessage = new CreateMessage(
      this.chat,
      this.chatData._id,
      user._id,
      Date.now().toString()
    )
    this.subscription = this.api.postResource('/message', newMessage)
      .pipe(
        tap(res => {
          console.log('Réponse à l\'envoie du message:', res)
          this.chat = ''
        })
      )
      .subscribe()
  }

  ionViewDidLeave(){
    this.subscription?.unsubscribe()
  }

}
