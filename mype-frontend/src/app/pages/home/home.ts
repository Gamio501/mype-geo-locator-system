import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { filter } from 'rxjs';
import { ProductoService } from '../../core/services/producto.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {

  productos: any[] = [];
  busqueda = '';

  constructor(
    private router: Router,
    private productoService: ProductoService
  ) {}

  ngOnInit() {
    this.cargarProductos();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.cargarProductos();
      });
  }

  cargarProductos() {
    this.productoService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error al cargar productos', err);
      }
    });
  }

  productosFiltrados() {
    return this.productos.filter(p =>
      p.nombre.toLowerCase().includes(this.busqueda.toLowerCase())
    );
  }

  getEstadoTexto(stock: number) {
    if (stock > 10) return 'Disponible';
    if (stock > 5) return 'Bajo';
    return 'No disponible';
  }

  getEstadoClass(stock: number) {
    if (stock > 10) return 'ok';
    if (stock > 5) return 'low';
    return 'off';
  }

  goLogin() {
    this.router.navigate(['/login']);
  }

  goRegister() {
    this.router.navigate(['/register']);
  }

  goMype() {
    this.router.navigate(['/mype-perfil']);
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }

  isLogged() {
    return !!localStorage.getItem('token');
  }

  getUser() {
    return localStorage.getItem('usuario');
  }

  getRol() {
    return localStorage.getItem('rol');
  }

  comprar() {
    if (!this.isLogged()) {
      this.router.navigate(['/login']);
    } else {
      alert('Pedido realizado');
    }
  }
}