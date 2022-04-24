import { Component, OnInit } from '@angular/core';
import { SegmentChangeEventDetail } from '@ionic/angular';
import { Observable } from 'rxjs';
import { TabsService } from './../../SERVICES/tabs.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  tabsStatus$: Observable<boolean>;

  constructor(private tabsService: TabsService) { }

  ngOnInit() {
    this.tabsStatus$ = this.tabsService.showTabs$;
    console.log('status des tabs:', this.tabsStatus$);
  }

  segmentChanged(event: CustomEvent<SegmentChangeEventDetail>){
    console.log(event.detail);
  }
}
