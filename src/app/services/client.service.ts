import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  private apiUrl = 'https://regsan-service-production.up.railway.app/api/clientes';

  constructor(private http: HttpClient) { }

  registerClient(clientData: any): Observable<any> {
    return this.http.post(this.apiUrl, clientData);
  }

  getClientByRFC(rfc: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${rfc}`);
  }

  updateClient(rfc: string, clientData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${rfc}`, clientData);
  }

  deleteClient(rfc: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${rfc}`);
  }

  getAllClients(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

}
