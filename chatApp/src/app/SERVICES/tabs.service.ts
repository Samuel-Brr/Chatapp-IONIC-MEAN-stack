/* eslint-disable @typescript-eslint/member-ordering */
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TabsService {

private subject = new BehaviorSubject<boolean>(true);
showTabs$: Observable<boolean> = this.subject.asObservable();

toggleTabs(){
  this.subject.next(!this.subject.value);
}

}
