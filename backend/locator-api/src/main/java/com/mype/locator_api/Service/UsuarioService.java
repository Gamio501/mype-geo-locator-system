package com.mype.locator_api.Service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.mype.locator_api.model.Usuario;
import com.mype.locator_api.repository.UsuarioRepository;


@Service
public class UsuarioService {

    private final UsuarioRepository usuarioRepository;

    public UsuarioService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }


    public List<Usuario> findAllUsers(){
        
        return usuarioRepository.findAll();
    }

    public Usuario crearUser(Usuario usuario){
        return usuarioRepository.save(usuario);
    }


    
}
