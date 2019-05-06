import { Component, OnInit } from '@angular/core';
import {PostService} from '../Services/post.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private postService : PostService,private router: Router, private formBuilder: FormBuilder) { }

  postForm : FormGroup;
  submitted = false;

  ngOnInit() {
    this.postForm = this.formBuilder.group({
      _id: [],
      post:['',Validators.required]
    });
  }

  onSubmit(){
    this.submitted = true;
    if(this.postForm.valid){
      this.postService.postupload(this.postForm.value)
      .subscribe(data => {
        this.router.navigate(['/home']);
        this.postForm.reset();  
      }),
      err => console.log(err);
      
    }
    else{
      alert("Please enter validate Value")
    }
  }

  get f() {
    return this.postForm.controls;
  }

}
