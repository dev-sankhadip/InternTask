import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router'


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor( private router:Router ) { }
  @Input('UserName') public username;

  ngOnInit(): void {
  }

  openNav() {
    document.getElementById("mySidenav").style.width = "250px";
  }
  
  closeNav() {
    document.getElementById("mySidenav").style.width = "0";
  }

  logout()
  {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("type");
    this.router.navigate([''])
  }

}
