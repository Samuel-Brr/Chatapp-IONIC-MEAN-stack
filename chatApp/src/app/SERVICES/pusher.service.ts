/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { Injectable } from '@angular/core';
import Pusher from 'pusher-js';


@Injectable({
  providedIn: 'root'
})
export class PusherService {
  pusher;

  constructor() {
    this.pusher = new Pusher('cee542e476f0a7f6c638', {
      cluster: 'eu',
      forceTLS: true
    });
   }

   subscribeToChannel(channelName: string, events: string[], cb: Function) {
    console.log('pusher service');
   const channel = this.pusher.subscribe(channelName);

   events.forEach( event => {
     console.log('whats the event ', event);
     channel.bind(event, function(data) {
       cb(data);
     });
   });
 }

 unsubscribe(channelName){
   this.pusher.unsubscribe(channelName);
 }
}
