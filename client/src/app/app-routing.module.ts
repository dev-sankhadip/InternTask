import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EditComponent } from './edit/edit.component';


const routes: Routes = [
  { path:'', component:LoginComponent },
  { path:'signup', component:SignupComponent },
  { 
    path:'dashboard', 
    children:[
      { path:'', component:DashboardComponent },
      { path:'list', component:DashboardComponent },
      { path:'edit', component:EditComponent },
      { path:'edit/:id', component:EditComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
