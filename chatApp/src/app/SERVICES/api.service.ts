import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ApiService {

  serverUrl = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  getChats(): Observable<any>{
    return this.httpClient.get(this.serverUrl+'/chats');
  }

  postChats(chat): Observable<any>{
    // console.log('Objet utilisateur que j\'envoie au backend:', chat);
    return this.httpClient.post(this.serverUrl+'/chats', chat);
  }

  postResource(route: string, item): Observable<any>{
    return this.httpClient.post(this.serverUrl + route, item, {observe: 'response'});
  }

  //User methods

  saveUser(user){
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(){
    return localStorage.getItem('user_id');
  }

  isRegistered(): boolean{
    return localStorage.getItem('user')? true : false;
  }

  userLogOut(){
    return localStorage.removeItem('user');
  }

  getUserPfp(){
    return this.httpClient.get('https://randomuser.me/api/?inc=picture');
  }

  checkUserSession(){
    return this.httpClient.get(this.serverUrl + '/chats/protected');
  }
}
