import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { postModel } from '../postModel';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  createAuthrorizationHeader(): HttpHeaders {
    let headers = new HttpHeaders();
    const token = localStorage.getItem('Auth_token');
    headers = headers.set('Auth_token', token);
    return headers
  }

  postupload(post: postModel) {
    let headers = this.createAuthrorizationHeader();
    return this.http.put('/user/uploadPost', post, { headers: headers })
      .pipe(tap(res => {
        console.log("Service file", res);
      }));
  }

  userPost() {
    let headers = this.createAuthrorizationHeader();
    return this.http.get<postModel[]>('/user/userPost', { headers: headers })
      .pipe(tap(res => {
        console.log("userPost Service file", res);
      }));
  }

}
