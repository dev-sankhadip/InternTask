import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


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
}