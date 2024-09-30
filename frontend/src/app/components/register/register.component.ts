import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  newUser = { username: '', email: '', password: '' };
  confirmPassword: string = '';
  passwordMismatch: boolean = false;

  constructor(private authService: AuthService) {}

  onSubmit() {
    if (this.newUser.password !== this.confirmPassword) {
      this.passwordMismatch = true;
      return;
    }

    // Reset mismatch error
    this.passwordMismatch = false;

    this.authService.signup({ username: this.newUser.username, password: this.newUser.password });
  }
}
