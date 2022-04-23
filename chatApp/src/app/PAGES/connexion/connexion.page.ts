import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/SERVICES/api.service';
import { tap, Subscription, catchError, throwError } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {

  subscription: Subscription;

  connexionForm: FormGroup = this.fb.group({
    userName:['', Validators.required],
    mdp:['', Validators.required ],
  });

  constructor(private fb: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private api: ApiService) { }

  ngOnInit() {
  }

  onSubmit(form: FormGroup){

    const authData = {
      name: form.value.userName,
      mdp: form.value.mdp
    };

    this.subscription = this.api.postResource('/chats/connexion', authData)
      .pipe(
        tap(res => {
          console.log('Réponse à la connexion:', res);
          if(res.status === 200){
            this.alertController.create({
              message: 'Connexion réussie 🥳',
              buttons: ['OK']
            })
            .then((alert)=>alert.present());

            this.router.navigateByUrl('/home/tabs/chats');
          }
        }),
        catchError(err => throwError(() => {
            new Error(err);
            this.alertController.create({
              message: 'Connexion échoué 😔',
              buttons: ['OK']
            })
            .then((alert)=>alert.present());
          })),
      )
      .subscribe();
  }

  ionViewDidLeave(){
    this.subscription.unsubscribe();
  }

  // convenience getter for easy access to form fields
  // eslint-disable-next-line @typescript-eslint/member-ordering
  get f() { return this.connexionForm.controls; }


}
