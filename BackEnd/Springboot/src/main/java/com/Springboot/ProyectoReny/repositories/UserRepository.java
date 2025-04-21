package com.Springboot.ProyectoReny.repositories;


import org.springframework.data.repository.CrudRepository;

import com.Springboot.ProyectoReny.entities.User;

public interface UserRepository extends CrudRepository<User, Long>  {

    
}
