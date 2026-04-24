import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CrearMypeRequest, Mype } from './mype';

@Injectable({
  providedIn: 'root'
})
export class MypeService {

  private apiUrl = 'http://localhost:8080/api/v1/mypes';

  constructor(private http: HttpClient) {}

  getMypes(): Observable<Mype[]> {
    return this.http.get<Mype[]>(this.apiUrl);
  }

  getMypeById(id: number): Observable<Mype> {
    return this.http.get<Mype>(`${this.apiUrl}/${id}`);
  }

  buscarPorDireccion(direccion: string): Observable<Mype[]> {
    return this.http.get<Mype[]>(`${this.apiUrl}/buscar`, {
      params: { direccion }
    });
  }

  crearMype(payload: CrearMypeRequest): Observable<Mype> {
    return this.http.post<Mype>(`${this.apiUrl}/crear`, payload);
  }
}