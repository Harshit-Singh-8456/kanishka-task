// app/create-emp-data/create-emp-data.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpApiService } from 'src/app/services/emp-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-emp-data',
  templateUrl: './create-emp-data.component.html',
  styleUrls: ['./create-emp-data.component.css']
})
export class CreateEmpDataComponent implements OnInit {
  employeeForm: FormGroup = this.fb.group({
    firstName: ['', Validators.required],
    lastName: [''],
    email: [''],
    dob: [''],
    gender: [''],
    education: [''],
    company: [''],
    experience: [null],
    package: [null]
  });

  saveMessage: string = '';
  idFromQuery: any;

  constructor(private fb: FormBuilder, private api: EmpApiService, public route: ActivatedRoute,
    private router: Router, private toastr: ToastrService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.idFromQuery = params['ID'];
      if (this.idFromQuery) {
        this.api.getJob(this.idFromQuery).subscribe((res) => {
          console.log(res);
          this.employeeForm.patchValue(res.data);
        });
      }
    });
  }

  updateData(val: any) {
    console.log(val.target.innerHTML);
    if (val.target.innerHTML === "Update") {
      if (this.employeeForm.valid) {
        this.api.updateJob(this.idFromQuery, this.employeeForm.value).subscribe((res) => {
          console.log(res);
        });
        this.employeeForm.reset();
        this.toastr.success('Data Updated successfully');
        this.router.navigate(['/']);

      } else {
        this.toastr.error('Please fill in all required fields');
      }
    }
    else {
      if (this.employeeForm.valid) {
        this.api.createJob(this.employeeForm.value).subscribe((res) => {
          console.log(res);
        });
        this.employeeForm.reset();
        this.toastr.success('Data saved successfully');
      } else {
        this.toastr.error('Please fill in all required fields');
      }
    }
  }

  saveData() {

  }
}
