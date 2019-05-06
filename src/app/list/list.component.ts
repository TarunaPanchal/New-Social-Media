import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import {userModel} from '../userModel';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  users : userModel[];
  index = "";

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userslist();
  }

  userslist():void {
    this.userService.userList()
    .subscribe(data=>{
      console.log(this.users = data);
    });
}


deleteAdUnit(id) {
  this.userService.deleteAdUnit(id).subscribe(res => {
     if (res) {alert("Delete User"); 
    console.log('Deleted'); }
    else { alert("No Delete");
    console.log(' No Delete');}
  });
}
}

