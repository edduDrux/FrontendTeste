import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      email: [''],
      password: [''],
      role: ['cliente'] // Valor padrão como 'cliente'
    });
  }

  onRegister() {
    const { email, password, role } = this.registerForm.value;

    // Incluímos o role no objeto enviado para o serviço de registro
    const userData = { email, password, role };

    this.authService.register(userData, role).subscribe(() => {
      // Redirecionar com base no role
      if (role === 'gerente') {
        this.router.navigate(['/manager']);
      } else {
        this.router.navigate(['/products']);
      }
    });
  }
}