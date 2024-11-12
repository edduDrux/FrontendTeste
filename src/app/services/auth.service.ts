import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(`${this.apiUrl}/managers?email=${email}&password=${password}`)
      .pipe(
        tap(users => {
          if (users.length) {
            this.router.navigate(['/admin']);
          } else {
            alert('Login falhou');
          }
        }),
        map(users => users.length > 0) 
      );
  }

  register(data: any, role: 'manager' | 'client'): Observable<any> {
    const endpoint = role === 'manager' ? 'managers' : 'clients';
    return this.http.post(`${this.apiUrl}/${endpoint}`, data);
  }
}