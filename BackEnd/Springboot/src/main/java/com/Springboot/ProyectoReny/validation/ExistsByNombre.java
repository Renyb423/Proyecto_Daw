package com.Springboot.ProyectoReny.validation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

@Constraint(validatedBy = ExistsByNombreValidation.class)
@Target(ElementType.FIELD)
@Retention(RetentionPolicy.RUNTIME)
public @interface ExistsByNombre {
	
    String message() default "Ya existe en la DDBB.";

	Class<?>[] groups() default { };

	Class<? extends Payload>[] payload() default { };
}
