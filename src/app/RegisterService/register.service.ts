import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:8080/api/v1/user/register'; // Your API endpoint

  constructor(private http: HttpClient) {}

  register(registerUser: { username: string; password: string; fullName: string; role: string; }): Observable<any> {
    // Pass the inline object directly to the POST request
    return this.http.post<any>(this.apiUrl, registerUser);
  }
}
