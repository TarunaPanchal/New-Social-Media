import { Component, OnInit } from '@angular/core';
import { FriendService } from '../Services/friend.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

  constructor(private friendService: FriendService) { }
  notifications;
  
  ngOnInit() {
    this.displayNotification();
  }


  displayNotification() {
    this.friendService.displayNotification()
      .subscribe(data => {
        console.log("Ts file Response => ",this.notifications = data);
      });
  }
}
