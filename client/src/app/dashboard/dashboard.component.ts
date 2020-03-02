import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../service/user.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor( private router:Router, private service:UserService ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  public users=[];
  public usersArray=[];
  public isUser:boolean;
  public username:string='';

  getUsers():void
  {
    const type=atob(window.localStorage.getItem('type'));
    type=='user' ? this.isUser=true : this.isUser=false;
    this.service.listUser()
    .subscribe((res)=>
    {
      this.username=res['username'];
      this.users=res['users']
      this.usersArray=res['users'];
    },(err)=>
    {
      console.log(err);
    })
  }

  gotoEdit(username)
  {
    this.router.navigate([`/dashboard/edit/${username}`]);
  }

  filterUserid(e)
  {
    if(e.target.value.length==0)
    {
      this.users=this.usersArray;
      return;
    }
    this.users=[];
    this.usersArray.map((user)=>
    {
      if(user[0].startsWith(e.target.value))
      {
        this.users.push(user);
      }
    })
  }

  filterUsername(e)
  {
    if(e.target.value.length==0)
    {
      this.users=this.usersArray;
      return;
    }
    this.users=[];
    this.usersArray.map((user)=>
    {
      if(user[2].startsWith(e.target.value))
      {
        this.users.push(user);
      }
    })
  }

  filterEmail(e)
  {
    if(e.target.value.length==0)
    {
      this.users=this.usersArray;
      return;
    }
    this.users=[];
    this.usersArray.map((user)=>
    {
      if(user[3].startsWith(e.target.value))
      {
        this.users.push(user);
      }
    })
  }

  filterPhone(e)
  {
    if(e.target.value.length==0)
    {
      this.users=this.usersArray;
      return;
    }
    this.users=[];
    this.usersArray.map((user)=>
    {
      if(user[4].startsWith(e.target.value))
      {
        this.users.push(user);
      }
    })
  }
}
