package com.Springboot.ProyectoReny.repositories;

import org.springframework.data.repository.CrudRepository;

import com.Springboot.ProyectoReny.entities.Producto;

public interface ProductRepository extends CrudRepository<Producto, Long> {
     boolean existsBySku(String sku);

     boolean existsBySkuAndIdNot(String sku, Long id);
     
}
