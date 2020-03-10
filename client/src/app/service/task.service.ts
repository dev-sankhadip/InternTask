import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor( private http:HttpClient ) { }

  private url="http://localhost:8000/";
  create(value)
  {
    const token=window.localStorage.getItem("token");
    return this.http.post(this.url+'task/create',{value},{ headers:new HttpHeaders({ 'authorization':token }) });
  }

  list()
  {
    return this.http.get(this.url+'task/list');
  }
}
