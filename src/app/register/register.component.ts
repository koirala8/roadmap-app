import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterService } from '../RegisterService/register.service';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, NgIf],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
  fullName: string = '';
  role: string = 'user'; // Default role
  errorMessage: string | null = null; // To display error messages

  constructor(private registerService: RegisterService, private router: Router) {}

  registerUser() {
    const registerData = {
      username: this.username,
      password: this.password,
      fullName: this.fullName,
      role: this.role
    };

    this.registerService.register(registerData).subscribe(
      response => {
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
