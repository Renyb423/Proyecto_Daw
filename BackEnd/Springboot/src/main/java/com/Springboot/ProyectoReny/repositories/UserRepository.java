package com.Springboot.ProyectoReny.repositories;


import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.Springboot.ProyectoReny.entities.User;

public interface UserRepository extends CrudRepository<User, Long>  {

    boolean existsByNombre(String nombre);

    Optional<User> findByNombre(String nombre);
    
}
