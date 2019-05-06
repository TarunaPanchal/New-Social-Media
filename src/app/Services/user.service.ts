import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { userModel } from '../userModel';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface isLoggedIn {
  status: boolean
}

interface logoutStatus{
  success: boolean
}

interface myData{
  name: string,
  email: string,
  bio: string,
  nickname: string,
  status: boolean,
  address: string
  id :string
}

@Injectable({ providedIn: 'root' })


export class UserService {
  uri = 'http://localhost:4000/user';
  constructor(private httpClient: HttpClient) { }

  createAuthrorizationHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('Auth_token');
    headers = headers.set('Auth_token', token);
    return headers
  }
  
  registration(user: userModel) {
    return this.httpClient.post('/user/register', user)
      .pipe(tap(res => {
        console.log(res);
      }));
  }

  login(user) {
    return this.httpClient.post<{Auth_token:String,_id:String}>('/user/login', user)
      .pipe(tap(res => {
        console.log("Login User ID => ",res._id);
        localStorage.setItem('Auth_token',res.Auth_token.toString());
        console.log(res);
      }));
  }
  deleteAdUnit(id){
    return this.httpClient.get(`${this.uri}/delete/${id}`);
  } 

  userList(){
    return this.httpClient.get<userModel[]>('/user/allUser')
    .pipe(tap(res => {
      console.log(res);
    }));
  }

  getData(){
    return this.httpClient.get<myData>('/user/data')
    }


    isLoggedIn(): Observable<isLoggedIn> {
      return this.httpClient.get<isLoggedIn>('/user/isloggedin')
    }
  
    logout(){
      return this.httpClient.get<logoutStatus>('/user/logout')
    } 

 userDetails(){
  let headers = this.createAuthrorizationHeader();
   return this.httpClient.get<userModel[]>('/user/showUserDetail',{headers : headers})
   .pipe(tap(res => {
    console.log(res);
  }));
 }

 updateAdUnit(name,bio,nickname,address, id) {

  const obj = {
   name : name,
   bio : bio,
   nickname : nickname,
   address : address
  };
  this
    .httpClient
    .post(`${this.uri}/user/update/${id}`, obj)
    .subscribe(res => console.log('Done'));
}
}






