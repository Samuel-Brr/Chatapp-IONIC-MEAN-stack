import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.page.html',
  styleUrls: ['./connexion.page.scss'],
})
export class ConnexionPage implements OnInit {

  connexionForm: FormGroup = this.fb.group({
    userName:['', Validators.required],
    mdp:['', ],
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit(form: FormGroup){}

}
