import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.authService.login({ email: this.email, password: this.password }).subscribe({
      next: () => {
        this.authService.getProfile().subscribe({
          next: (profile) => this.handleRedirection(profile.role),
          error: () => this.error = 'Failed to fetch user profile'
        });
      },
      error: () => this.error = 'Login failed: Invalid credentials'
    });
  }

  private handleRedirection(role: string): void {
    switch (role) {
      case 'Admin':
        this.router.navigate(['/admin/dashboard']);
        break;
      case 'Sales':
        this.router.navigate(['/sales/dashboard']);
        break;
      case 'Billing':
        this.router.navigate(['/billing/dashboard']);
        break;
      case 'Regulatory':
        this.router.navigate(['/regulatory/dashboard']);
        break;
      default:
        this.router.navigate(['/public']); // o manejar algún tipo de error o caso no contemplado
    }
  }
}
