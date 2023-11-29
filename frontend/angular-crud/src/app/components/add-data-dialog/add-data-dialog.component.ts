import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmpApiService } from 'src/app/services/emp-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-data-dialog',
  templateUrl: './add-data-dialog.component.html',
  styleUrls: ['./add-data-dialog.component.css']
})
export class AddDataDialogComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<AddDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: EmpApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    console.log(this.data)
    if (this.data && this.data._id) {
      this.api.getJob(this.data._id).subscribe(
        (res) => {
          this.data = res.data;
          console.log(this.data);
        },
        (error) => {
          this.toastr.error('Something went wrong');
          console.error('Error fetching job:', error);
        }
      );
    }
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.data._id) {
      // Update existing record
      this.api.updateJob(this.data._id, this.data).subscribe(
        (res) => {
          // Handle success
          this.toastr.success('Data updated successfully');
          this.dialogRef.close(res);
        },
        (error) => {
          this.toastr.error('Something went wrong');
          console.error('Error updating job:', error);
        }
      );
    } else {
      // Create new record
      this.api.createJob(this.data).subscribe(
        (res) => {
          // Handle success
          this.toastr.success('New Data Created successfully');
          this.dialogRef.close(res);
        },
        (error) => {
          this.toastr.error('Something went wrong');
          console.error('Error creating job:', error);
        }
      );
    }
  }
}
