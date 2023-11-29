import { Component, OnInit } from '@angular/core';
import { EmpApiService } from 'src/app/services/emp-api.service';
import { Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-emp-table',
  templateUrl: './emp-table.component.html',
  styleUrls: ['./emp-table.component.css']
})
export class EmpTableComponent implements OnInit {
  searchInput: any;
  allEmpData: any;
  private searchSubject = new Subject<string>();
  loading: boolean = false;
  currentPage = 1;
  private readonly pageSize = 10;
  count: number = 0; // Initialize count with 0
  startIndex = 0;

  constructor(private api: EmpApiService, private toastr: ToastrService) { }

  ngOnInit() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(searchQuery => {
        this.loading = true;
        return this.api.getAllJobs(searchQuery, this.currentPage, this.pageSize).pipe(
          catchError(error => {
            console.error('Error in search:', error);
            return of(null); // Return an observable to keep the stream alive
          })
        );
      })
    ).subscribe(
      (response) => {
        this.allEmpData = response ? response.data : null;
        this.count = response ? response.count : 0;
        this.loading = false;
      },
      (error) => {
        console.error('Error loading data', error);
        this.loading = false;
      }
    );

    this.loadData();
  }

  loadData() {
    this.loading = true;
    this.api.getAllJobs('', this.currentPage, this.pageSize).subscribe(
      (response) => {
        this.allEmpData = response ? response.data : null;
        this.count = response ? response.count : 0;
        this.loading = false;
        this.startIndex = (this.currentPage - 1) * this.pageSize + 1;
      },
      (error) => {
        console.error('Error loading data', error);
        this.loading = false;
      }
    );
  }

  deleteData(id: string) {
    this.api.deleteJob(id).subscribe((response) => {
      console.log(response);
      this.toastr.success('Data Deleted successfully');
      this.loadData();
    });
  }

  getSearchValue() {
    this.searchSubject.next(this.searchInput);
  }

  changePage(newPage: number): void {
    if (newPage >= 1 && newPage <= this.getTotalPages()) {
      this.currentPage = newPage;
      this.loadData();
    }
  }

  getPages(): number[] {
    const totalPages = this.getTotalPages();
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  getTotalPages(): number {
    return Math.ceil(this.count / this.pageSize);
  }
}
