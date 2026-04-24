import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      usuario: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      rol: ['', Validators.required],
      nombre_comercial: [''],
      ruc: [''],
      direccion: [''],
      latitud: [''],
      longitud: ['']
    });
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition(pos => {
      this.form.patchValue({
        latitud: pos.coords.latitude,
        longitud: pos.coords.longitude
      });
    });
  }

  register() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.router.navigate(['/']);
    } else {
      this.form.markAllAsTouched();
    }
  }
}