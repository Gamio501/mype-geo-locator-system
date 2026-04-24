export interface Usuario {
  id: number;
  nombreUsuario: string;
  correo: string;
  rol: string;
}

export interface Mype {
  id: number;
  nombreComercial: string;
  ruc: string;
  direccion: string;
  latitud: number;
  longitud: number;
  usuario?: Usuario;
}

export interface CrearUsuarioRequest {
  nombreUsuario: string;
  contrasenia: string;
  correo: string;
  rol: string;
}

export interface CrearMypeRequest {
  nombreComercial: string;
  ruc: string;
  direccion: string;
  latitud: number | null;
  longitud: number | null;
  usuario: { id: number };
}

export interface LoginRequest {
  nombreUsuario: string;
  contrasenia: string;
}

export interface AuthResponse {
  tokenAcceso: string;
  nombreUsuario: string;
  rol: string;
}