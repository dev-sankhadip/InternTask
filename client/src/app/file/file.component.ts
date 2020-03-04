import { Component, OnInit } from '@angular/core';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.css']
})
export class FileComponent implements OnInit {

  constructor(private service: UserService) { }

  ngOnInit(): void {
  }

  downloadCSV() {
    this.service.download()
      .subscribe((res) => {
        const blob = new Blob([res]);
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", 'file.csv');
        document.body.appendChild(link);
        link.click();
      }, (err) => {
        console.log(err);
      })
  }

  uploadCSV(e) {
    const formData = new FormData();
    formData.append("file", e.target.files[0]);
    this.service.upload(formData)
      .subscribe((res) => {
        console.log(res);
      }, (err) => {
        console.log(err);
      })
  }

}
