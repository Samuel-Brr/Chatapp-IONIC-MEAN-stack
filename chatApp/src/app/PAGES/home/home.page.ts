import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  segmentChanged(event: CustomEvent<SegmentChangeEventDetail>){
    console.log(event.detail)
  }
}
