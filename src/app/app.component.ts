import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})

export class AppComponent implements OnInit {
  dataAvailable: boolean = false;
  data = [];

  addType = 'folder';
  name = '';
  showBtn:boolean =false;
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.getData();
  }

  save() {
    this.appService.saveData(this.name,this.addType,null).subscribe(data => {
      if (data.status == 200) {
        this.getData();
      }
    });
  }

  showHide(){
    this.showBtn =!this.showBtn;
  }

  getData() {
    return this.appService.fetchNodes().subscribe(data => {
      if (data.status == 200) {
        this.data = data.data;

        console.log('data');
        console.log(this.data);
        this.dataAvailable = true;
      }
    });
  }

}
