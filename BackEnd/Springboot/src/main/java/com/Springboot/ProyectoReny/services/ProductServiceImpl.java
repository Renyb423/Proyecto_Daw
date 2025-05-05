package com.Springboot.ProyectoReny.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.Springboot.ProyectoReny.entities.Producto;
import com.Springboot.ProyectoReny.repositories.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepository repository;

    @Transactional(readOnly = true)
    @Override
    public List<Producto> findAll() {
        return (List<Producto>) repository.findAll();
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Producto> findById(Long id) {
        return repository.findById(id);
    }

    @Override
    @Transactional
    public Producto save(Producto product) {
        return repository.save(product);
    }

    @Override
    @Transactional
    public Optional<Producto> update(Long id, Producto product) {
        Optional<Producto> productOptional = repository.findById(id);
        if (productOptional.isPresent()) {
            Producto productDb = productOptional.orElseThrow();
            
            
            productDb.setSku(product.getSku());
            productDb.setNombre(product.getNombre());
            productDb.setPrecioCompra(product.getPrecioCompra());
            productDb.setPrecioVenta(product.getPrecioVenta());
            productDb.setCantidad(product.getCantidad());
            productDb.setProveedor(product.getProveedor());

            return Optional.of(repository.save(productDb));
            
        }
        return productOptional;
    }

    @Transactional
    @Override
    public Optional<Producto> delete(Long id) {
        Optional<Producto> productOptional = repository.findById(id);
        productOptional.ifPresent(productDb -> {
            repository.delete(productDb);
        });
        return productOptional;
    }

    @Override
    @Transactional(readOnly = true)
    public boolean existsBySku(String sku) {
         return repository.existsBySku(sku);
        
     }

     public boolean existsBySkuAndIdNot(String sku, Long id) {
        return repository.existsBySkuAndIdNot(sku, id);
    }


}
