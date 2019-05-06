import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { PostService } from '../Services/post.service';
import { FriendService } from '../Services/friend.service';
import { ActivatedRoute ,Router } from '@angular/router';
import { userModel } from '../userModel';
import { postModel } from '../postModel';
import { FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {

  user: userModel[];
  post: postModel[];
  users: any = {};
  friends;
  signupFormModalName = new FormControl('', Validators.required);
signupFormModalEmail = new FormControl('', Validators.email);
signupFormModalPassword = new FormControl('', Validators.required);
  constructor(
    private userService: UserService,
    private router: Router,
    private postService: PostService,
    private friendService: FriendService,
    private route: ActivatedRoute
  ) { }
  
  email =  " No "
  name = ""
  bio = ""
  nickname = ""
  address = ""
  id= ""

  ngOnInit() {

    this.userService.getData().subscribe(detail => {
      if(detail.status){
        this.name = detail.name
        this.email = detail.email
        this.bio = detail.bio
        this.nickname = detail.nickname
        this.address = detail.address
        this.id = detail.id
       
     }else{
       console.log("Profile not fetch data ")
      // this.router.navigate(['logout'])
      //  this.router.navigate([''])
     }
    })

    this.getUserDetails();
    this.getUserPost();
    this.getFriends();
  }

  //show login user's Details
  getUserDetails(): void {
    this.userService.userDetails()
      .subscribe(data => {
        this.user = data;
      })
  }

  getUserPost(): void {
    this.postService.userPost()
      .subscribe(data => {
        this.post = data;
      })
  }

  getFriends() {
    this.friendService.displayFriends()
      .subscribe(data => {
        console.log("Ts file Response => ", this.friends = data);
      });
  }

  updateAdUnit(name,bio,nickname,address) {
    
    this.route.params.subscribe(params => {
      this.userService.updateAdUnit(name,bio,nickname,address, params['email']);
     console.log("Update succesfully")
  });
        
}
}
