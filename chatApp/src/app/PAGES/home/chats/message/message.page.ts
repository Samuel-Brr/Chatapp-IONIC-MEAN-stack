import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { Chat } from 'src/app/MODELS/chat.model';
import { TabsService } from './../../../../SERVICES/tabs.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {

  private subject = new BehaviorSubject<Chat | null>(null);
  chatData$: Observable<Chat | null> = this.subject.asObservable();



  constructor(private route: ActivatedRoute,
      private router: Router,
      private tabsService: TabsService) {

        this.route.queryParams
          .pipe(
            tap(params => {
              if(this.router.getCurrentNavigation().extras.state){
                this.subject.next(this.router.getCurrentNavigation().extras.state.chat)
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

}
