package com.mype.locator_api.Service;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.stereotype.Service;

import com.mype.locator_api.model.Mype;
import com.mype.locator_api.model.Usuario;
import com.mype.locator_api.repository.MypeRepository;
import com.mype.locator_api.repository.UsuarioRepository;

@Service
public class MypeService {

    private final MypeRepository mypeRepository;
    private final UsuarioRepository usuarioRepository;
    
    public MypeService(MypeRepository mypeRepository, UsuarioRepository usuarioRepository) {
        this.mypeRepository = mypeRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public Mype crearMype(Mype mype) {

        Usuario usuario = usuarioRepository.findById(mype.getUsuario().getId())
        .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        mype.setUsuario(usuario);

        return mypeRepository.save(mype);
    }

    public List<Mype> obtenerMypes() {
        return mypeRepository.findAll();
        
    }

    public Mype buscarPorId(Long id) {
        return mypeRepository.findById(id).orElse(null);

    }

    public List<Mype> buscarPorDireccion(String direccion) {
        return mypeRepository.findAll()
                .stream()
                .filter(mype -> direccion
                .equalsIgnoreCase(mype.getDireccion()))
                .toList();

    }

    public Mype actualizarporId(Long id, Mype mype) {
        Mype existente = mypeRepository.findById(id).orElse(null);

        if (existente != null) {
            existente.setNombreComercial(mype.getNombreComercial());
            existente.setDireccion(mype.getDireccion());
            existente.setRuc(mype.getRuc());
            existente.setLatitud(mype.getLatitud());
            existente.setLongitud(mype.getLongitud());

            return mypeRepository.save(existente);
        }

        return null;

    }

    public void eliminarPorId(Long id) {
        mypeRepository.deleteById(id);
    }
}
