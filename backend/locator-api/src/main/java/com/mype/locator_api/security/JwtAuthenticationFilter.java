package com.mype.locator_api.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.lang.NonNull;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService servicioJwt;
    private final UserDetailsService servicioDetallesUsuario;

    

    public JwtAuthenticationFilter(JwtService servicioJwt, UserDetailsService servicioDetallesUsuario) {
        this.servicioJwt = servicioJwt;
        this.servicioDetallesUsuario = servicioDetallesUsuario;
    }



    @Override
    protected void doFilterInternal(
            @NonNull HttpServletRequest peticion,
            @NonNull HttpServletResponse respuesta,
            @NonNull FilterChain filtroChain
    ) throws ServletException, IOException {
        final String encabezadoAutenticacion = peticion.getHeader("Authorization");
        final String jwt;
        final String nombreUsuario;

        if (encabezadoAutenticacion == null || !encabezadoAutenticacion.startsWith("Bearer ")) {
            filtroChain.doFilter(peticion, respuesta);
            return;
        }

        jwt = encabezadoAutenticacion.substring(7);
        nombreUsuario = servicioJwt.extraerNombreUsuario(jwt);

        if (nombreUsuario != null && SecurityContextHolder.getContext().getAuthentication() == null) {
            UserDetails detallesUsuario = this.servicioDetallesUsuario.loadUserByUsername(nombreUsuario);
            if (servicioJwt.esTokenValido(jwt, detallesUsuario)) {
                UsernamePasswordAuthenticationToken tokenAutenticacion = new UsernamePasswordAuthenticationToken(
                        detallesUsuario,
                        null,
                        detallesUsuario.getAuthorities()
                );
                tokenAutenticacion.setDetails(
                        new WebAuthenticationDetailsSource().buildDetails(peticion)
                );
                SecurityContextHolder.getContext().setAuthentication(tokenAutenticacion);
            }
        }
        filtroChain.doFilter(peticion, respuesta);
    }
}
