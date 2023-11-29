import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ToastrService } from 'ngx-toastr';
import {
  debounceTime,
  distinctUntilChanged,
  switchMap,
  catchError,
} from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { EmpApiService } from 'src/app/services/emp-api.service';
import { MatDialog } from '@angular/material/dialog';
import { AddDataDialogComponent } from '../add-data-dialog/add-data-dialog.component';
import { ChangeDetectionStrategy } from '@angular/core';


export interface Job {
  firstName: string;
  lastName: string;
  dob: string;
  gender: string;
  education: string;
  company: string;
  experience: string;
  package: string;
  email: string;
}

@Component({
  selector: 'app-emp-table',
  templateUrl: './emp-table.component.html',
  styleUrls: ['./emp-table.component.css'],
})
export class EmpTableComponent implements OnInit {
  displayedColumns: string[] = [
    'position',
    'firstName',
    'lastName',
    'email',
    'dob',
    'gender',
    'education',
    'company',
    'experience',
    'package',
    'actions',
  ];
  dataSource = new MatTableDataSource<Job>();
  private searchTerms = new Subject<string>();
  isLoading = false;
  isViewInit = false;

  constructor(
    private liveAnnouncer: LiveAnnouncer,
    private jobService: EmpApiService,
    private toastr: ToastrService,
    public dialog: MatDialog
  ) { }

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit() {
    // ngOnInit logic, if needed
  }

  ngAfterViewInit() {
    this.isViewInit = true; // Set the flag to true after the view is initialized
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

    if (this.isViewInit) {
      // Fetch data from the API only after the view is initialized
      this.jobService.getAllJobs().subscribe(
        (data) => {
          this.dataSource.data = data.data;
        },
        (error) => {
          console.error('Error fetching jobs:', error);
        }
      );
    }

    // Set up the search observables
    this.searchTerms
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap((term: string) =>
          this.jobService.getAllJobs(term).pipe(
            catchError((error) => {
              console.error('Error searching jobs:', error);
              return of([]);
            })
          )
        )
      )
      .subscribe(
        (data) => {
          this.dataSource.data = data.data;
        },
        (error) => {
          console.error('Error searching jobs:', error);
        }
      );
  }

  announceSortChange(sortState: any) {
    if (sortState.direction) {
      this.liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this.liveAnnouncer.announce('Sorting cleared');
    }
  }

  openAddDataDialog(id?: string) {
    const dialogRef = this.dialog.open(AddDataDialogComponent, {
      width: '500px',
      data: { _id: id } // You can pass initial data to your dialog if needed
    });

    dialogRef.afterClosed().subscribe(result => {
      // Handle the result after the dialog is closed
      if (result) {
        // Do something with the result if needed
        console.log(result);
        this.ngAfterViewInit(); // Call ngOnInit to refresh the data
      }
    });
  }

  editData(id: string) { }

  deleteData(id: string) {
    this.jobService.deleteJob(id).subscribe(
      (res) => {
        this.toastr.success('Job deleted successfully');
        this.ngOnInit(); // Call ngOnInit to refresh the data
      },
      (error) => {
        console.error('Error fetching jobs:', error);
      }
    );
  }

  search(event: any): void {
    const term = (event.target as HTMLInputElement).value;
    this.searchTerms.next(term);
  }
}
