import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onLogin() {
    const { email, password } = this.loginForm.value;
    this.authService.login(email, password).subscribe((success) => {
      if (!success) {
        alert('Login falhou');
      }
    });
  }

  // Método para redirecionar para a página de registro
  goToRegister() {
    this.router.navigate(['/register']);
  }
}