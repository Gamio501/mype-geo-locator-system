import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class Login {

  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
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

    if (usuario === 'frank' && password === '12345') {
      localStorage.setItem('token', 'fake');
      localStorage.setItem('usuario', 'Frank');
      localStorage.setItem('rol', 'cliente');

      this.router.navigate(['/']);
      return;
    }

    if (usuario === 'bodega' && password === '12345') {
      localStorage.setItem('token', 'fake');
      localStorage.setItem('usuario', 'Bodega Don Gilberto');
      localStorage.setItem('rol', 'mype');

      this.router.navigate(['/']);
      return;
    }

    alert('Credenciales incorrectas');
  }
}