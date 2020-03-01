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
  public type:string='';

  getUsers():void
  {
    this.type=atob(window.localStorage.getItem('type'));
    this.service.listUser()
    .subscribe((res)=>
    {
      console.log(res);
      this.users=res['users']
      console.log(this.users);
    },(err)=>
    {
      console.log(err);
    })
  }

  gotoEdit(username)
  {
    this.router.navigate([`/dashboard/edit/${username}`]);
  }
}
