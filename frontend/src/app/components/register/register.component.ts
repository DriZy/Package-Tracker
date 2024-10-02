import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserRoles } from '../../common/enums'; // Import the UserRoles enum

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  newUser = { username: '', email: '', password: '', role: UserRoles.Customer }; // Add role with default 'customer'
  confirmPassword: string = '';
  passwordMismatch: boolean = false;

  userRolesEnum = UserRoles;

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.passwordMismatch = this.newUser.password !== this.confirmPassword;

    if (this.passwordMismatch) {
      return;
    }

    this.authService.signup(this.newUser);
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
