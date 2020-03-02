import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  public url="http://localhost:8000/";

  signup(value)
  {
    return this.http.post(this.url+'user/signup', value);
  }

  login(value)
  {
    return this.http.post(this.url+'user/login',value);
  }

  listUser()
  {
    const token=window.localStorage.getItem("token");
    return this.http.get(this.url+'user/users',{headers:new HttpHeaders({ 'Authorization':token })});
  }

  getUserValue(username)
  {
    return this.http.get(this.url+`user/${username}`);
  }

  updateUser(value)
  {
    const token=window.localStorage.getItem('token');
    return this.http.put(this.url+'user/update',value,{headers:new HttpHeaders({'Authorization':token})});
  }
}