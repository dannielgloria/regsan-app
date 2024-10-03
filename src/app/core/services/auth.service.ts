import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/login`, credentials).pipe(
      switchMap(response => {
        if (response.access_token) {
          sessionStorage.setItem('token', response.access_token);
          return this.getProfile();
        } else {
          throw new Error('Token is missing in the response');
        }
      }),
      tap(profile => {
        sessionStorage.setItem('role', profile.role);
      }),
      catchError(error => {        return throwError(error);
      })
    );
  }

  getProfile(): Observable<{ role: string }> {
    return this.http.get<{ role: string }>(`${this.apiUrl}/profile`, {
      headers: { Authorization: `Bearer ${sessionStorage.getItem('token')}` }
    });
  }
}
