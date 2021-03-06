/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Observable, BehaviorSubject, tap, Subscription } from 'rxjs';
import { Chat } from 'src/app/MODELS/chat.model';
import { CreateMessage } from 'src/app/MODELS/createMessage.model';
import { ApiService } from 'src/app/SERVICES/api.service';
import { PusherService } from 'src/app/SERVICES/pusher.service';
import { TabsService } from './../../../../SERVICES/tabs.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.page.html',
  styleUrls: ['./message.page.scss'],
})
export class MessagePage implements OnInit {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  user_id;
  chat;
  chatData;
  subscription: Subscription;



  constructor(private route: ActivatedRoute,
      private api: ApiService,
      private router: Router,
      private alertController: AlertController,
      private pusher: PusherService,
      private tabsService: TabsService) {

        this.route.queryParams
          .pipe(
            tap(params => {
              if(this.router.getCurrentNavigation().extras.state){
                this.chatData = this.router.getCurrentNavigation().extras.state.chat;
              }
            })
          )
          .subscribe();
      }

  ngOnInit() {
  }

  ionViewWillEnter(){
    // console.log('toto',this.api.getUser());
    // console.log('message page enter view');
    this.tabsService.toggleTabs();

    this.user_id = this.api.getUser();

    this.pusher.subscribeToChannel('message', ['inserted'], (data) => {
      this.chatData.messages.push(data);
    });
    this.pusher.subscribeToChannel('message', ['deleted'], () => {
      this.chatData.messages.pop();
    });
    this.pusher.subscribeToChannel('message', ['updated'], (data) => {
      this.chatData.messages[this.chatData.messages.length - 1].message = data.message;

    });

    console.log('Id du chat:',this.chatData._id);
    console.log('Id de l\'utilisateur:',this.user_id);
  }


  ionViewDidLeave(){
    console.log('La page message va sortir de la view');
    this.subscription?.unsubscribe();

    this.tabsService.toggleTabs();
    this.pusher.unsubscribe('message');
  }

  getDate(){
    return new Date();
  }

  onPostMessage(){

    // console.log(this.user);
    const newMessage = new CreateMessage(
      this.chat,
      this.chatData._id,
      this.user_id,
      Date.now().toString()
    );
    this.subscription = this.api.postResource('message', newMessage)
      .pipe(
        tap(res => {
          console.log('R??ponse ?? l\'envoie du message:', res);
          this.chat = '';
        })
      )
      .subscribe();
  }

  onEditMessage(messageId: string){

    const alert =  this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Modifier votre message',
      inputs: [
        {
          name: 'name1',
          type: 'text',
          placeholder: 'Modifier votre message'
        }
      ],
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
            }
          },
          {
            text: 'Modifier',
            handler: (data) => {

              this.api.updateMessage({message_id: messageId, message: data.name1})
                .pipe(
                  tap(res => {
                    console.log('R??ponse ?? la maj du msg:', res);
                  })
                )
                .subscribe();

            }
          }
        ]
      }).then(alertEl => alertEl.present() );
  }

  onDeleteMessage(messageId: string){

      const alert = this.alertController.create({
        header: 'Supprimer le message ?',
        buttons: [
          {
            text: 'Annuler',
            role: 'cancel',
            cssClass: 'secondary',
            handler: () => {
              console.log('Confirm Cancel: blah');
            }
          }, {
            text: 'Supprimer',
            handler: () => {
              console.log('supprimer clicked', messageId);
              this.api.deleteMessage({message_id: messageId})
                .pipe(
                  tap(res => {
                    console.log('R??ponse ?? la suppression du msg:', res);
                  })
                )
                .subscribe();
            }
          }
        ]
      }).then(alertEl => alertEl.present());

  }



}
