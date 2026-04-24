import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private api = 'http://localhost:8080/api/productos';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<any> {
    return this.http.get(this.api);
  }

  guardarProducto(producto: any): Observable<any> {
    return this.http.post(this.api, producto);
  }
}
