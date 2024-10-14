import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TechnicalDataService {
  private apiUrl = 'http://localhost:3000/api/datos-tecnicos';

  constructor(private http: HttpClient) { }

  getAllTechnicalData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  getTechnicalDataByIdProsses(idProsses: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${idProsses}`);
  }

  createTechnicalData(TechnicalData: any): Observable<any> {
    return this.http.post(this.apiUrl, TechnicalData);
  }
}
