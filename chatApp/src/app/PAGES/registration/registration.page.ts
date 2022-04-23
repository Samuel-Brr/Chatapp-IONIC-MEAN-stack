import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { tap, Observable, Subscription } from 'rxjs';
import { ApiService } from 'src/app/SERVICES/api.service';
import { Router } from '@angular/router';
import { createPasswordStrengthValidator } from 'src/app/VALIDATORS/pswrdStrength.validator';
import { ConfirmedValidator } from 'src/app/VALIDATORS/checkPswrd.validator';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit, OnDestroy {

  subscription: Subscription;

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
    private api: ApiService) { }

  ngOnInit() {
    this.checkUserAuth();
  }

  // convenience getter for easy access to form fields
  // eslint-disable-next-line @typescript-eslint/member-ordering
  get f() { return this.registrationForm.controls; }

  onSubmit(form: FormGroup){
    const userName = form.value.userName;

    const obj = {
      name:userName
    };

    this.subscription = this.api.postChats(obj)
      .pipe(
        tap(responseObj => {
          this.alertController.create({
              message: 'User Created 🥳',
              buttons: ['OK']
            })
            .then((alert)=>alert.present());
          console.log('Réponse du serveur:', responseObj);
          this.api.saveUser(responseObj);
          this.router.navigateByUrl('/home/tabs/chats');
          }
        )
      )
      .subscribe();
  }

  ionViewDidLeave(){
    this.subscription?.unsubscribe();
    console.log('registration page did leave the view');
  }

  ngOnDestroy(): void {

  }

  checkUserAuth(){
    if(this.api.getUser()){
      this.router.navigateByUrl('/home/tabs/chats');
    }

  }

  segmentChanged(){}

}
