import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../core/service/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Modal } from 'bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (res: any) => {
          localStorage.setItem('token', res.token);
          localStorage.setItem('id', res.id);
          localStorage.setItem('role', res.role);

          alert('Login successful');

          if (res.role === 'USER') {
            this.router.navigate(['/home']);
          } else if (res.role === 'ADMIN') {
            this.router.navigate(['/admin-dashboard']);
          }
        },
        error: () => {
          alert('Login failed');
        },
      });
    }
  }

  onRegister(): void {
    if (this.registerForm.valid) {
      const { name, email, password, confirmPassword } =
        this.registerForm.value;
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }

      this.authService.register({ name, email, password }).subscribe({
        next: () => {
          alert('Registration successful');
          this.router.navigateByUrl('/home');
          // Close modal
          const modalEl = document.getElementById('registerModal');
          if (modalEl) {
            const modal = Modal.getInstance(modalEl) || new Modal(modalEl);
            modal.hide();
          }

          // Redirect to login
          this.router.navigateByUrl('/home');
        },
        error: () => {
          alert('Registration failed');
        },
      });
    }
  }
}
