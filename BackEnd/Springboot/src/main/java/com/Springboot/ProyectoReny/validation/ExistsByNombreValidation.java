package com.Springboot.ProyectoReny.validation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.Springboot.ProyectoReny.services.UserService;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

@Component
public class ExistsByNombreValidation implements ConstraintValidator<ExistsByNombre, String> {

    private UserService service;

    public ExistsByNombreValidation() {
        // constructor vacío → evita la excepción
    }

    @Autowired
    public ExistsByNombreValidation(UserService service) {
        this.service = service;
    }

    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) return true;
        if (service == null) return true; 
        return !service.existsByNombre(value);
    }
}
