package com.Springboot.ProyectoReny.services;

import java.util.List;

import com.Springboot.ProyectoReny.entities.User;


public interface UserService {

    List<User> findAll();

    User save(User user);

    boolean existsByNombre(String nombre);
}
