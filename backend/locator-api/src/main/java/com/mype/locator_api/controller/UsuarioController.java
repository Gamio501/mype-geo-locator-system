package com.mype.locator_api.controller;

import com.mype.locator_api.Service.UsuarioService;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mype.locator_api.model.Usuario;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("api/v1/users")
public class UsuarioController {

    private final UsuarioService usuarioService;
  


    public UsuarioController(UsuarioService usuarioService) {
        this.usuarioService = usuarioService;
    }



    @GetMapping
    public List<Usuario> listar(){
        return usuarioService.findAllUsers();
        
    }

@PostMapping("/crear")
public Usuario crearUser(@RequestBody Usuario usuario) {
    
    return usuarioService.crearUser(usuario);
}


    }
    
    

