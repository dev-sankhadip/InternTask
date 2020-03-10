import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { TaskService } from '../service/task.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

  constructor(private service: TaskService) { }

  ngOnInit(): void {
    this.listTask();
  }

  listTask() {
    this.service.list()
      .subscribe((res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      })
  }

  public taskForm = new FormGroup({
    des: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required])
  })

  add() {
    const taskid = Math.random().toString(36).substring(2, 5) + Math.random().toString(36).substring(2, 5);
    const appid = Math.floor(Math.random() * 90000) + 1;
    this.service.create({ ...this.taskForm.value, appid, taskid })
      .subscribe((res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      })
  }

}
