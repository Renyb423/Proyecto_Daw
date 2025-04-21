package com.Springboot.ProyectoReny.repositories;

import java.util.Optional;

import org.springframework.data.repository.CrudRepository;

import com.Springboot.ProyectoReny.entities.Role;


public interface RoleRepository extends CrudRepository<Role, Long> {

    Optional<Role> findByName(String name);
}
