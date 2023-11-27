import { Component, OnInit } from '@angular/core';
import { EmpApiService } from 'src/app/services/emp-api.service';

@Component({
  selector: 'app-emp-table',
  templateUrl: './emp-table.component.html',
  styleUrls: ['./emp-table.component.css']
})
export class EmpTableComponent implements OnInit {
  allEmpData: any;

  constructor(private api: EmpApiService) {
  }

  ngOnInit() {
    this.getAllEmpData();
  }

  getAllEmpData() {
    this.api.getAllJobs().subscribe((response) => {
      this.allEmpData = response.data;
    })
  }

  deleteData(id: string) {
    this.api.deleteJob(id).subscribe((response) => {
      console.log(response);
      this.getAllEmpData();
    });
  }


}
