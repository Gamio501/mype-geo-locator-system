package com.mype.locator_api.controller;

import com.mype.locator_api.dto.AuthResponse;
import com.mype.locator_api.dto.LoginRequest;
import com.mype.locator_api.model.Usuario;
import com.mype.locator_api.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager administradorAutenticacion;
    private final JwtService servicioJwt;

    

    public AuthController(AuthenticationManager administradorAutenticacion, JwtService servicioJwt) {
        this.administradorAutenticacion = administradorAutenticacion;
        this.servicioJwt = servicioJwt;
}



    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest peticion) {
        Authentication autenticacion = administradorAutenticacion.authenticate(
                new UsernamePasswordAuthenticationToken(
                        peticion.getNombreUsuario(),
                        peticion.getContrasenia()
                )
        );

        Usuario usuario = (Usuario) autenticacion.getPrincipal();
        String jwtToken = servicioJwt.generarToken(usuario);

        return ResponseEntity.ok(AuthResponse.builder()
                .tokenAcceso(jwtToken)
                .nombreUsuario(usuario.getNombreUsuario())
                .rol(usuario.getRol().name())
                .build());
    }
}
