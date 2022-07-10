import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreateChat } from '../MODELS/createChat.model';
import { Chat } from '../MODELS/chat.model';

@Injectable({providedIn: 'root'})
export class ApiService {

  serverUrl = 'https://my-very-first-chat-app.herokuapp.com/';

  constructor(private httpClient: HttpClient) { }

  getChats(): Observable<Chat[]>{
    return this.httpClient.get(this.serverUrl+'chats') as Observable<Chat[]> ;
  }

  postChats(chat: CreateChat): Observable<Chat>{
    // console.log('Objet utilisateur que j\'envoie au backend:', chat);
    return this.httpClient.post<Chat>(this.serverUrl+'chats', chat);
  }

  postResource(route: string, item): Observable<any>{
    return this.httpClient.post(this.serverUrl + route, item, {observe: 'response'});
  }

  deleteMessage(messageId){
    return this.httpClient.delete(this.serverUrl + 'message', {body: messageId });
  }

  updateMessage(reqBody){
    return this.httpClient.put(this.serverUrl + 'message', {body: reqBody });
  }
  //User methods

  saveUser(user){
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(){
    return localStorage.getItem('user_id');
  }

  isAdmin(){
    return localStorage.getItem('adminRole');
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
    return this.httpClient.get(this.serverUrl + 'chats/protected');
  }

  //Test

  test(){
    return this.httpClient.get(this.serverUrl + 'admin');
  }

}
