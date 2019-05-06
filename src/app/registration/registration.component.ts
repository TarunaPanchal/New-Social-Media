import { Component, OnInit } from '@angular/core';
import { UserService } from '../Services/user.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})

export class RegistrationComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private formBuilder: FormBuilder) { }

  registerFrom: FormGroup;
  submitted = false;

  ngOnInit() {
    this.registerFrom = this.formBuilder.group({
      _id: [],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit () {
    this.submitted = true;
    if (this.registerFrom.valid) {
      this.userService.registration(this.registerFrom.value)

        .subscribe(data => {
          console.log(data);
        }),
        err => console.log(err);

    }
  }


  get f() {
    return this.registerFrom.controls;
  }

}
