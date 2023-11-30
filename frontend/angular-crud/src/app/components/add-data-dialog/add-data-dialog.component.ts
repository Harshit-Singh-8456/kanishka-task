import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EmpApiService } from 'src/app/services/emp-api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-data-dialog',
  templateUrl: './add-data-dialog.component.html',
  styleUrls: ['./add-data-dialog.component.css']
})
export class AddDataDialogComponent implements OnInit {
  dataForm!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<AddDataDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private api: EmpApiService,
    private toastr: ToastrService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();

    if (this.data && this.data._id) {
      this.api.getJob(this.data._id).subscribe(
        (res) => {
          this.dataForm.patchValue(res.data);
          console.log(this.dataForm.value);
        },
        (error) => {
          this.toastr.error('Something went wrong');
          console.error('Error fetching job:', error);
        }
      );
    }
  }

  initForm() {
    this.dataForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      dob: [null, Validators.required],
      gender: ['', Validators.required],
      education: ['', Validators.required],
      company: ['', Validators.required],
      experience: ['', Validators.required],
      package: ['', Validators.required]
    });
  }

  onNoClick() {
    this.dialogRef.close();
  }

  onSave(): void {
    if (this.dataForm.valid) {
      const formData = this.dataForm.value;

      if (this.data._id) {
        // Update existing record
        this.api.updateJob(this.data._id, formData).subscribe(
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
        this.api.createJob(formData).subscribe(
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
    } else {
      // Handle form validation error, e.g., display a message to the user
      this.toastr.error('Please fill in all required fields.');
    }
  }
}
