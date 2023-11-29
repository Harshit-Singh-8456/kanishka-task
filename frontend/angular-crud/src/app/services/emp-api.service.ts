import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EmpApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllJobs(search?: string, page?: number, limit?: number): Observable<any> {
    let params = new HttpParams();

    if (search) {
      params = params.set('search', search);
    }

    return this.http.get(`${this.apiUrl}/jobs`, { params });
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
