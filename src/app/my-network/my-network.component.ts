import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { FriendService } from '../Services/friend.service';
import { Router } from '@angular/router';
import { userModel } from '../userModel';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-network',
  templateUrl: './my-network.component.html',
  styleUrls: ['./my-network.component.css']
})
export class MyNetworkComponent implements OnInit {


  constructor(private userService: UserService, private friendService: FriendService, private router: Router, private formBuilder: FormBuilder) { }

  users: userModel[];
  notifications;

  ngOnInit() {
    this.userslist();
    this.displayNotification();
  }

  userslist(): void {
    this.userService.userList()
      .subscribe(data => {
        console.log(this.users = data);
      });
  }

  connect(_id) {
    this.friendService.sendConnectReq(_id)
      .subscribe(data => {
        console.log(data);
      });
  }

  accept(_id) {
    this.friendService.acceptReq(_id)
      .subscribe(data => {
        this.router.navigate(['/profile']);
      });
  }

  displayNotification() {
    this.friendService.displayNotification()
      .subscribe(data => {
        console.log("Ts file Response => ",this.notifications = data);
      });
  }

delete(_id){
this.friendService.ignore(_id)
.subscribe(data => {
  this.router.navigate(['/network']);
});
}
}
