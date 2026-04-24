import { Component } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mype-perfil',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './mype-perfil.html',
  styleUrl: './mype-perfil.scss'
})
export class MypePerfil {

  form!: FormGroup;
  productoForm!: FormGroup;
  productos: any[] = [];

  constructor(private fb: FormBuilder, private router: Router) {
    this.form = this.fb.group({
      nombre: ['Bodega Don Gilberto', Validators.required],
      direccion: ['Trujillo', Validators.required]
    });

    this.productoForm = this.fb.group({
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required]
    });

    this.cargarProductos();
  }

  getUser() {
    return localStorage.getItem('usuario');
  }

  irInicio() {
    this.router.navigate(['/']);
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }

  cargarProductos() {
    const data = localStorage.getItem('productos');
    this.productos = data ? JSON.parse(data) : [];
  }

  agregarProducto() {
    if (this.productoForm.valid) {
      const productos = JSON.parse(localStorage.getItem('productos') || '[]');

      const nuevo = {
        ...this.productoForm.value,
        tienda: localStorage.getItem('usuario')
      };

      productos.push(nuevo);

      localStorage.setItem('productos', JSON.stringify(productos));

      this.productos = productos;
      this.productoForm.reset();
    }
  }

  eliminarProducto(index: number) {
    this.productos.splice(index, 1);
    localStorage.setItem('productos', JSON.stringify(this.productos));
  }

  guardar() {
    alert('Datos actualizados');
  }
}