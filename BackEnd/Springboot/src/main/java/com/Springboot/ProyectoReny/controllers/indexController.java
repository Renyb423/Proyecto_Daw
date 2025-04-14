package com.Springboot.ProyectoReny.controllers;

import com.Springboot.ProyectoReny.models.Usuario;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/app")
public class indexController {

    @GetMapping({"/index", "/home"})
    public String index(Model model) {
        model.addAttribute("titulo", "hola Curso Spring Boot");
        return "index";
    }

    @RequestMapping("/perfil")
    public String perfil(Model model) {

        Usuario usuario = new Usuario();
        usuario.setNombre("Reny");
        usuario.setApellido("Baca");
        usuario.setEmail("google.com");
        usuario.setPassword("newPAss");
        model.addAttribute("usuario",  usuario);
        model.addAttribute("titulo", "Perfil del usuario: " + usuario.getNombre());
        return "perfil";
    }
}
