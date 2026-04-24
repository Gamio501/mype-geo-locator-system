package com.mype.locator_api;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class Mype {

    private Long id;
    private String nombre;
    private String descripcion;
    private String logo;
}
