package com.mype.locator_api.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MypeResponseDTO {
    private Long id;
    private String nombreComercial;
    private String ruc;
    private String direccion;
    private BigDecimal latitud;
    private BigDecimal longitud;
}
