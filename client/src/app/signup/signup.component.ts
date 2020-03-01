import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  signupForm=new FormGroup({
    userid:new FormControl(null,[ Validators.required ]),
    username:new FormControl('',[ Validators.required ]),
    email:new FormControl('',[ Validators.required, Validators.email ]),
    password:new FormControl('',[ Validators.required ]),
    cpassword:new FormControl('',[ Validators.required ]),
    phone:new FormControl(''),
    permission:new FormControl('',[ Validators.required ])
  })

  ngOnInit(): void {
  }

  get userid() { return this.signupForm.get('userid'); }

  get username() { return this.signupForm.get('username'); }

  get email() { return this.signupForm.get('email'); }

  get password() { return this.signupForm.get('password'); }

  get cpassword() { return this.signupForm.get('cpassword'); }

  get permission() { return this.signupForm.get('permission');}

}
