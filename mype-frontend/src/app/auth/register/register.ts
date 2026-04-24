import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { hashSync } from 'bcryptjs';
import { UsuarioService } from '../../services/usuario.service';
import { MypeService } from '../../services/mype.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
  form!: FormGroup;
  error = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usuarioService: UsuarioService,
    private mypeService: MypeService
  ) {
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
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;
    const passwordHasheado = hashSync(data.password, 10);

    this.usuarioService.crearUsuario({
      nombreUsuario: data.usuario,
      contrasenia: passwordHasheado,
      correo: data.email,
      rol: data.rol.toUpperCase()
    }).subscribe({
      next: (usuarioCreado) => {
        if (data.rol !== 'mype') {
          this.error = '';
          this.router.navigate(['/login']);
          return;
        }

        this.mypeService.crearMype({
          nombreComercial: data.nombre_comercial,
          ruc: data.ruc,
          direccion: data.direccion,
          latitud: data.latitud ? Number(data.latitud) : null,
          longitud: data.longitud ? Number(data.longitud) : null,
          usuario: { id: usuarioCreado.id }
        }).subscribe({
          next: () => {
            this.error = '';
            this.router.navigate(['/login']);
          },
          error: () => {
            this.error = 'Usuario creado, pero no se pudo crear la mype.';
          }
        });
      },
      error: () => {
        this.error = 'No se pudo registrar el usuario.';
      }
    });
    }
}