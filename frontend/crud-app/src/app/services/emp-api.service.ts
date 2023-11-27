import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllJobs(): Observable<any> {
    return this.http.get(`${this.apiUrl}/jobs`);
  }

  getJob(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/jobs/${id}`);
  }

  createJob(jobData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/jobs`, jobData);
  }

  updateJob(jobId: string, jobData: any): Observable<any> {
    return this.http.patch(`${this.apiUrl}/jobs/${jobId}`, jobData);
  }

  deleteJob(jobId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/jobs/${jobId}`);
  }
}
