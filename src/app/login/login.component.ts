import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) { }

  loginForm: FormGroup;
  submitted = false;
  email = 'admin';
password = 'admin';

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.valid) {
      if(this.email === 'admin' && this.password === 'admin'){
        this.router.navigate(['/admin']);
      }
      
      this.userService.login(this.loginForm.value)

        .subscribe(data => {
          this.router.navigate(['/home']);
        }),
        err => console.log(err);

    }
  }


  get f() {
    return this.loginForm.controls;
  }

}
