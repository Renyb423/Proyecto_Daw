package com.Springboot.ProyectoReny.repositories;


import org.springframework.data.repository.CrudRepository;

import com.Springboot.ProyectoReny.entities.Usuario;

public interface UserRepository extends CrudRepository<Usuario, Long>  {

    
}
