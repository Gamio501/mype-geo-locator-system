import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MypeService } from '../../services/mype.service';
import { Mype } from '../../services/mype';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {

  mypes: Mype[] = [];
  busqueda = '';
  errorCarga = '';

  constructor(
    private router: Router,
    private mypeService: MypeService
  ) {}

  ngOnInit() {
    this.cargarMypes();
  }

  
  cargarMypes() {
    this.mypeService.getMypes().subscribe({
      next: (data) => {
        this.mypes = data;
        this.errorCarga = '';
      },
      error: () => {
        this.errorCarga = 'No se pudieron cargar las MYPES.';
      }
    });
  }

 
  get mypesFiltradas(): Mype[] {
    const termino = this.busqueda.trim().toLowerCase();
    if (!termino) {
      return this.mypes;
    }

    return this.mypes.filter(m =>
      `${m.nombreComercial ?? ''} ${m.ruc ?? ''} ${m.direccion ?? ''}`
        .toLowerCase()
        .includes(termino)
    );
  }

 
  verDetalle(mype: Mype) {
    console.log('Detalle:', mype);
    this.router.navigate(['/mype-perfil']);
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
    localStorage.clear();
    this.router.navigate(['/']);
  }
}