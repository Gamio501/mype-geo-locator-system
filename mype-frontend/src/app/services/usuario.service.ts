import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CrearUsuarioRequest, Usuario } from './mype';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/v1/users';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  crearUsuario(payload: CrearUsuarioRequest): Observable<Usuario> {
    return this.http.post<Usuario>(`${this.apiUrl}/crear`, payload);
  }
}
