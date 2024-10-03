import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProcessesService {
    private apiUrl = 'http://localhost:3000/api/tramites';

    constructor(private http: HttpClient) { }

    getProcesses(param: string): Observable<any> {
      return this.http.get(`${this.apiUrl}/${param}`);
    }

  }
