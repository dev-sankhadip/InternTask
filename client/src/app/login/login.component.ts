import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor( private service:UserService ) { }

  loginForm=new FormGroup({
    user:new FormControl('',[Validators.required]),
    password:new FormControl('',[Validators.required])
  })

  public error:string='';

  ngOnInit(): void {
  }

  submit()
  {
    this.service.login(this.loginForm.value)
    .subscribe((res)=>
    {
      console.log(res);
    },(err)=>
    {
      console.log(err);
      this.error=err.error;
    })
  }

  get user() { return this.loginForm.get('user'); }

  get password() { return this.loginForm.get('password'); }

}
