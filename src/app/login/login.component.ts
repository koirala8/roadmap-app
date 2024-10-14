import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from "../Service/auth.service";
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [
    FormsModule
  ],
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  role: string = ''; // Default role

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    const loginData = {
      username: this.username,
      password: this.password,
      role: this.role
    };

    this.authService.login(loginData.username, loginData.password, loginData.role).subscribe(
      response => {
        console.log('Login successful', response);

        // Check user role and navigate accordingly
        if (this.role === 'admin') {
          this.router.navigate(['/direction']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error => {
        console.error('Login failed', error);
        // Handle login failure (e.g., show an error message)
        this.router.navigate(['/login-failed']);
      }
    );
  }
}
