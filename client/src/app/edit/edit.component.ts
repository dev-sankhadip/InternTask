import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordValidator } from '../validators/password';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor( private route:ActivatedRoute ) { }
  public id:String;
  public error:string='';
  
  editForm=new FormGroup({
    userid:new FormControl(null,[ Validators.required ]),
    username:new FormControl('',[ Validators.required ]),
    email:new FormControl('',[ Validators.required, Validators.email ]),
    password:new FormControl('',[ Validators.required ]),
    cpassword:new FormControl('',[ Validators.required, passwordValidator ]),
    phone:new FormControl(''),
    permission:new FormControl('',[ Validators.required ])
  })

  ngOnInit(): void {
    this.id=this.route.snapshot.params['id'];
    console.log(this.id);
  }

  get userid() { return this.editForm.get('userid'); }

  get username() { return this.editForm.get('username'); }

  get email() { return this.editForm.get('email'); }

  get password() { return this.editForm.get('password'); }

  get cpassword() { return this.editForm.get('cpassword'); }

  get permission() { return this.editForm.get('permission');}

  submit()
  {

  }

}
