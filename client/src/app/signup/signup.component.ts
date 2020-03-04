import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms'


import { passwordValidator } from '../validators/password'
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor( private service:UserService ) { }
  public error:string='';

  signupForm=new FormGroup({
    userid:new FormControl(null,[ Validators.required ]),
    username:new FormControl('',[ Validators.required ]),
    email:new FormControl('',[ Validators.required, Validators.email ]),
    password:new FormControl('',[ Validators.required ]),
    cpassword:new FormControl('',[ Validators.required, passwordValidator ]),
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

  submit()
  {
    this.service.signup(this.signupForm.value)
    .subscribe((res)=>
    {
      console.log(res);
      this.signupForm.reset();
    },(err)=>
    {
      console.log(err);
      this.error=err.error;
    })
  }

}
