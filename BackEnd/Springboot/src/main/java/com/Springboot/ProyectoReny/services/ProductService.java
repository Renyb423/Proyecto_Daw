package com.Springboot.ProyectoReny.services;

import java.util.List;
import java.util.Optional;

import com.Springboot.ProyectoReny.entities.Producto;

public interface ProductService {
    
    List<Producto> findAll();

    Optional<Producto> findById(Long id);

    Producto save(Producto product);
    
    Optional<Producto> update(Long id, Producto product);

    Optional<Producto> delete(Long id);

    boolean existsBySku(String sku);

    boolean existsBySkuAndIdNot(String sku, Long id);
}
