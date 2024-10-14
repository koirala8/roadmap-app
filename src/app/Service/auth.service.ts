import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/api/v1/user/login'; // Your API endpoint

  constructor(private http: HttpClient) {}

  login(username: string, password: string, role: string): Observable<any> {
    const body = { username, password, role };
    return this.http.post<any>(this.apiUrl, body);
  }

}
