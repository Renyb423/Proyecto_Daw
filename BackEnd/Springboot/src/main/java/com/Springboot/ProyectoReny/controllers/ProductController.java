package com.Springboot.ProyectoReny.controllers;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

// import com.andres.curso.springboot.app.springbootcrud.ProductValidation;
import com.Springboot.ProyectoReny.entities.Producto;
import com.Springboot.ProyectoReny.services.ProductService;

import jakarta.validation.Valid;

@RestController
// @CrossOrigin(origins="http://localhost:4200", originPatterns = "*")
@RequestMapping("/api/products")
public class ProductController {
    
    @Autowired
    private ProductService service;

    // @Autowired
    // private ProductValidation valdation;

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'READER')")
    public List<Producto> list() {
        return service.findAll();
    }
    
    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN', 'READER')")
    public ResponseEntity<?> view(@PathVariable Long id) {
        Optional<Producto> productOptional = service.findById(id);
        if (productOptional.isPresent()) {
            return ResponseEntity.ok(productOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }
    
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> create(@Valid @RequestBody Producto product, BindingResult result) {
        // valdation.validate(product, result);
        if (result.hasFieldErrors()) {
            return validation(result);
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(service.save(product));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> update(@Valid @RequestBody Producto product, BindingResult result, @PathVariable Long id) {
        Producto existingProduct = service.findById(id).orElseThrow(() -> new RuntimeException("Producto no encontrado"));
    
        // Solo validamos el SKU si es diferente al SKU del producto existente
        if (!existingProduct.getSku().equals(product.getSku())) {
            if (service.existsBySku(product.getSku())) {
                result.rejectValue("sku", "sku.exists", "El SKU ya existe en la base de datos.");
            }
        }
    
        // Si hay errores de validación, los retornamos
        if (result.hasErrors()) {
            return validation(result);
        }
    
        // Procedemos con la actualización
        Optional<Producto> updatedProduct = service.update(id, product);
        if (updatedProduct.isPresent()) {
            return ResponseEntity.status(HttpStatus.CREATED).body(updatedProduct.get());
        }
    
        return ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        Optional<Producto> productOptional = service.delete(id);
        if (productOptional.isPresent()) {
            return ResponseEntity.ok(productOptional.orElseThrow());
        }
        return ResponseEntity.notFound().build();
    }

    private ResponseEntity<?> validation(BindingResult result) {
        Map<String, String> errors = new HashMap<>();

        result.getFieldErrors().forEach(err -> {
            errors.put(err.getField(), "El campo " + err.getField() + " " + err.getDefaultMessage());
        });
        return ResponseEntity.badRequest().body(errors);
    }
}
