package com.mype.locator_api.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Service
public class JwtService {

    private static final String CLAVE_SECRETA = "404E635266556A586E3272357538782F413F4428472B4B6250645367566B5970";

    public String extraerNombreUsuario(String token) {
        return extraerAtributo(token, Claims::getSubject);
    }

    public <T> T extraerAtributo(String token, Function<Claims, T> resolvedorAtributos) {
        final Claims claims = extraerTodosLosAtributos(token);
        return resolvedorAtributos.apply(claims);
    }

    public String generarToken(UserDetails detallesUsuario) {
        return generarToken(new HashMap<>(), detallesUsuario);
    }

    public String generarToken(Map<String, Object> atributosExtra, UserDetails detallesUsuario) {
        return Jwts
                .builder()
                .setClaims(atributosExtra)
                .setSubject(detallesUsuario.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24))
                .signWith(obtenerLlaveFirma(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean esTokenValido(String token, UserDetails detallesUsuario) {
        final String nombreUsuario = extraerNombreUsuario(token);
        return (nombreUsuario.equals(detallesUsuario.getUsername())) && !estaTokenExpirado(token);
    }

    private boolean estaTokenExpirado(String token) {
        return extraerExpiracion(token).before(new Date());
    }

    private Date extraerExpiracion(String token) {
        return extraerAtributo(token, Claims::getExpiration);
    }

    private Claims extraerTodosLosAtributos(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(obtenerLlaveFirma())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    private Key obtenerLlaveFirma() {
        byte[] bytesLlave = Decoders.BASE64.decode(CLAVE_SECRETA);
        return Keys.hmacShaKeyFor(bytesLlave);
    }
}
