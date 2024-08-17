import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<{ access_token: string }>(`${this.apiUrl}/login`, credentials)
      .pipe(
        tap(response => {
          console.log('Login response:', response); // Verifica la respuesta aquí
          if (response.access_token) {
            localStorage.setItem('token', response.access_token);
          } else {
            console.error('Token is missing in the response');
          }
        }),
        catchError(error => {
          console.error('Login error:', error); // Verifica los errores aquí
          return throwError(error);
        })
      );
  }

  getProfile(): Observable<any> {
    return this.http.get<{ role: string }>(`${this.apiUrl}/profile`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    }).pipe(
      catchError(error => throwError(error))
    );
  }
}
