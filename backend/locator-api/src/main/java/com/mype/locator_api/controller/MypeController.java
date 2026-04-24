package com.mype.locator_api.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mype.locator_api.Service.MypeService;
import com.mype.locator_api.model.Mype;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("api/v1/mypes")
public class MypeController {

    private final MypeService mypeService;

    public MypeController(MypeService mypeService) {
        this.mypeService = mypeService;
    }

    @GetMapping
    public List<Mype> listar(){
        return mypeService.obtenerMypes();
    }

    @PostMapping("/crear")
    public Mype crearMype(@RequestBody Mype mype){
      
        return mypeService.crearMype(mype);
    }
    

     @GetMapping("/{id}")
    public Mype buscar (@PathVariable Long id){
        return mypeService.buscarPorId(id);
    }

    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id){
        mypeService.eliminarPorId(id);
    }
    
    @GetMapping("/buscar")
    public List<Mype> buscarPorDireccion(@RequestParam String dirrecion){
        return mypeService.buscarPorDireccion(dirrecion);
    }
    

    
}
