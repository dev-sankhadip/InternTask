import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { passwordValidator } from '../validators/password';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor( private route:ActivatedRoute, private service:UserService ) { }
  public user:String;
  public error:string='';
  
  editForm=new FormGroup({
    userid:new FormControl(null,[ Validators.required ]),
    username:new FormControl('',[ Validators.required ]),
    email:new FormControl('',[ Validators.required, Validators.email ]),
    // password:new FormControl('',[ Validators.required ]),
    // cpassword:new FormControl('',[ Validators.required, passwordValidator ]),
    phone:new FormControl(''),
    permission:new FormControl('',[ Validators.required ])
  })

  ngOnInit(): void {
    this.user=this.route.snapshot.params['username'];
    console.log(this.user);
    this.service.getUserValue(this.user)
    .subscribe((res)=>
    {
      console.log(res);
      this.editForm.patchValue({
        userid:res['user'][0][0], 
        username:res['user'][0][1],
        email:res['user'][0][2],
        // password:res['user'][0][3],
        // cpassword:res['user'][0][3],
        phone:res['user'][0][4],
        permission:res['user'][0][5]
      })
    },(err)=>
    {
      console.log(err);
    })
  }

  get userid() { return this.editForm.get('userid'); }

  get username() { return this.editForm.get('username'); }

  get email() { return this.editForm.get('email'); }

  get password() { return this.editForm.get('password'); }

  get cpassword() { return this.editForm.get('cpassword'); }

  get permission() { return this.editForm.get('permission');}

  submit()
  {
    this.service.updateUser(this.editForm.value, this.user)
    .subscribe((res)=>
    {
      alert("Updated");
    },(err)=>
    {
      this.error=err.error;
    })
  }

}
