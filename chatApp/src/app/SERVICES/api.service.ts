import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ApiService {

  serverUrl: string = "http://localhost:3000"

  constructor(private httpClient: HttpClient) { }

  getChats():Observable<any>{
    return this.httpClient.get(this.serverUrl+'/chats')
  }

  postChats(chat):Observable<any>{
    return this.httpClient.post(this.serverUrl+'/chats', chat)
  }

  //User methods

  saveUser(user){
    localStorage.setItem('user', JSON.stringify(user))
  }

  getUser(){
    return localStorage.getItem('user')
  }

  isRegistered(): boolean{
    return localStorage.getItem('user')? true : false
  }

  userLogOut(){
    return localStorage.removeItem('user')
  }

}
