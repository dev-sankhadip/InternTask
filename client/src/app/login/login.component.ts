import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { Router } from '@angular/router';

import { UserService } from '../service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service: UserService, private router: Router) { }

  loginForm = new FormGroup({
    user: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  public error: string = '';

  ngOnInit(): void {
  }

  submit() {
    let cookies = document.cookie.split(';');
    new Promise((resolve, reject) => {
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim().split('=');
        if (cookie[0] == 'attempt') {
          reject();
        }
      }
      resolve();
    })
      .then((res) => {
        this.service.login(this.loginForm.value)
          .subscribe((res) => {
            window.localStorage.setItem('token', res['token']);
            window.localStorage.setItem('type', btoa(res['type']));
            this.router.navigate(['dashboard']);
          }, (err) => {
            this.error = err.error;
            let attempt = localStorage.getItem("attempt");
            if (attempt) {
              if (parseInt(attempt) == 2) {
                var date = new Date();
                date.setTime(date.getTime() + 300000);
                document.cookie = "attempt=3" + "; expires=" + date.toUTCString() + "; path=/";
                localStorage.setItem("attempt", (parseInt(attempt) + 1).toString());
                return;
              }
              localStorage.setItem("attempt", (parseInt(attempt) + 1).toString());
            }
            else {
              localStorage.setItem("attempt", "1")
            }
          })
      })
      .catch((err) => {
        alert("Try after 5 min");
      })
  }

  get user() { return this.loginForm.get('user'); }

  get password() { return this.loginForm.get('password'); }

}
