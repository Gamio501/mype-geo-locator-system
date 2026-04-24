package com.mype.locator_api;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/Mypes")
public class MypeController {

    public List<Mype> mypes;

    public MypeController(){
        this.mypes = new ArrayList<>();
        mypes.add(Mype.builder().id(1L).nombre("Tienda A").descripcion("venta de abarrotes").logo("imagen1").build());
          mypes.add(Mype.builder().id(2L).nombre("Tienda B").descripcion("Tienda mayorista").logo("imagen2").build());
    }

    // traer todas la empresas
    @GetMapping("")
    public ResponseEntity<List<Mype>> getallMypes(@RequestParam(required = false) String pagesize) {
        return ResponseEntity.ok(mypes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mype> getMypeById(@PathVariable Long id) {

        Mype mype = mypes.stream()
                .filter(m -> m.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Mype not found"));

        return ResponseEntity.ok(mype);
    }

    @PostMapping("")
    public ResponseEntity<Void> saveMype(@RequestBody Mype mype){
      mypes.add(mype);
      return ResponseEntity.created("/api/v1/Mypes/".concat(mype.getId().toString()))

    }

}
