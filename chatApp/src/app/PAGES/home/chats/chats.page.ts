/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, NavController } from '@ionic/angular';
import { BehaviorSubject, tap, Observable, catchError, throwError } from 'rxjs';
import { Chat } from 'src/app/MODELS/chat.model';
import { ApiService } from 'src/app/SERVICES/api.service';
import { AuthService } from 'src/app/SERVICES/auth.service';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
})
export class ChatsPage implements OnInit {

  private subject = new BehaviorSubject<Chat[]>([]);
  chatArr$: Observable<Chat[]> = this.subject.asObservable();

  constructor(private api: ApiService,
    private authService: AuthService,
    private alertController: AlertController,
    private router: Router,
    private navCtrl: NavController ) { }

  ngOnInit() {
    this.getAllChats();
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

  selectChat(chat){
    const navigationExtra: NavigationExtras ={
      state:{
        chat
      }
    };
    console.log('clicked !');
    this.navCtrl.navigateForward('/home/tabs/chats/message', navigationExtra);
  }

  onTest(){
    this.api.test()
      .pipe(
        tap(res => {
          console.log(res);
         })
      )
      .subscribe();
  }

  onLogout(){


    const alert = this.alertController.create({
      header: 'Déconnexion',
      message: 'Etes vous sur de vouloir vous déconnecter ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Déconnexion',
          handler: () => {
            this.authService.logout();
            this.router.navigate(['registration']);
          }
        }
      ]
    }).then(alertEl => alertEl.present());


  }
}
