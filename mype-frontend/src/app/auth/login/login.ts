import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  form!: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const usuario = this.form.get('usuario')?.value;
    const password = this.form.get('password')?.value;

    if (!usuario || !password) {
      this.form.markAllAsTouched();
      return;
    }

    this.authService.login({
      nombreUsuario: usuario,
      contrasenia: password
    }).subscribe({
      next: (respuesta) => {
        localStorage.setItem('token', respuesta.tokenAcceso);
        localStorage.setItem('usuario', respuesta.nombreUsuario);
        localStorage.setItem('rol', respuesta.rol.toLowerCase());
        this.error = '';
        this.router.navigate(['/']);
      },
      error: () => {
        this.error = 'Credenciales incorrectas o servidor no disponible.';
      }
    });
  }
}