import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  private apiUrl = 'http://localhost:3000/api/empleados';

  constructor(private http: HttpClient) { }

  registerEmploye(employeData: any): Observable<any> {
    return this.http.post(this.apiUrl, employeData);
  }


  updateEmploye(phone_number: string, employeData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${phone_number}`, employeData);
  }

  deleteEmploye(phone_number: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${phone_number}`);
  }

  getAllEmployes(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }
}
