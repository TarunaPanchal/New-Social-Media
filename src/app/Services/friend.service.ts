import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class FriendService {

  constructor(private httpClient: HttpClient) { }

  createAuthrorizationHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('Auth_token');
    headers = headers.set('Auth_token', token);
    return headers
  }

  sendConnectReq(_id) {
    let headers = this.createAuthrorizationHeader();
    return this.httpClient.post('/user/connect', {_id:_id} , { headers: headers })
  }

  displayNotification(){
    let headers = this.createAuthrorizationHeader();
    return this.httpClient.get('/user/notificationList',{headers :headers})
  }

  acceptReq(_id) {
    let headers = this.createAuthrorizationHeader();
    return this.httpClient.put('/user/accept', {_id:_id} , { headers: headers })
  }

  displayFriends(){
    let headers = this.createAuthrorizationHeader();
    return this.httpClient.get('/user/friendsList',{headers :headers})
  }
  
  ignore(_id){
    let headers = this.createAuthrorizationHeader();
    return this.httpClient.post('/user/ignore',_id,{headers:headers})
  }
}  