import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { tap, Observable, Subscription, map } from 'rxjs';
import { ApiService } from 'src/app/SERVICES/api.service';
import { Router } from '@angular/router';
import { createPasswordStrengthValidator } from 'src/app/VALIDATORS/pswrdStrength.validator';
import { ConfirmedValidator } from 'src/app/VALIDATORS/checkPswrd.validator';
import { CreateChat } from './../../MODELS/createChat.model';
import { AuthService } from 'src/app/SERVICES/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  randomUserPfp;
  subscription: Subscription;
  subscription2: Subscription;

  registrationForm: FormGroup = this.fb.group({
    userName:['', Validators.required],
    mdp:['',[
      Validators.required,
      Validators.minLength(8),
      createPasswordStrengthValidator()
    ] ],
    confirmMdp:['',Validators.required]
  },{
    validator: ConfirmedValidator('mdp','confirmMdp')
  });

  constructor(private fb: FormBuilder,
    private alertController: AlertController,
    private router: Router,
    private authService: AuthService,
    private api: ApiService) { }

  ngOnInit() {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['home','tabs','chats']);
    }
    this.getRandomUserPfp();
  }

  ionViewDidLeave(){
    this.subscription?.unsubscribe();
    this.subscription2?.unsubscribe();
    // console.log('registration page did leave the view');
  }


  // convenience getter for easy access to form fields
  // eslint-disable-next-line @typescript-eslint/member-ordering
  get f() { return this.registrationForm.controls; }

  onSubmit(form: FormGroup){

    const userName = form.value.userName;
    const mdp = form.value.mdp;
    const pfp = this.randomUserPfp;
    // console.log('image de profile:', pfp);
    const utilisateur = new CreateChat(
      userName,
      mdp,
      pfp,
      [],
    );

    this.subscription = this.api.postChats(utilisateur)
      .pipe(
        tap(responseObj => {
          this.alertController.create({
              message: 'Inscription réussie 🥳',
              buttons: ['OK']
            })
            .then((alert)=>alert.present());
          // console.log('Réponse du serveur:', responseObj);
          this.api.saveUser(responseObj);
          this.router.navigateByUrl('/connexion');
          }
        )
      )
      .subscribe();
  }

    getRandomUserPfp(){

    this.subscription2 = this.api.getUserPfp()
      .pipe(
        tap((res: {results}) => {
          this.randomUserPfp = res.results[0].picture.thumbnail;
          // console.log(res.results[0].picture.thumbnail);
        })
      )
      .subscribe();

  }

}
