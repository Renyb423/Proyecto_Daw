package com.Springboot.ProyectoReny.security;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.Ordered;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import com.Springboot.ProyectoReny.security.filter.JwtAuthenticationFilter;
import com.Springboot.ProyectoReny.security.filter.JwtValidationFilter;

@Configuration
@EnableMethodSecurity(prePostEnabled = true)
public class SpringSecurityConfig {

    @Autowired
    private AuthenticationConfiguration authenticationConfiguration;

    @Bean
    AuthenticationManager authenticationManager() throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        return http.cors(cors -> cors.configurationSource(corsConfigurationSource()))
        .csrf(csrf -> csrf.disable()).authorizeHttpRequests( (authz) -> authz.requestMatchers( HttpMethod.GET , "/api/users").permitAll()
        .requestMatchers( HttpMethod.POST , "/api/users/register").permitAll()
        .requestMatchers( HttpMethod.POST , "/api/users").permitAll()
        .requestMatchers( HttpMethod.GET , "/api/products").permitAll()
        // .requestMatchers( HttpMethod.POST , "/api/users").hasRole("ADMIN")
        // .requestMatchers( HttpMethod.POST , "/api/products").hasRole("ADMIN")
        // .requestMatchers( HttpMethod.GET , "/api/products" , "/api/products/{id}" ).hasAnyRole("ADMIN", "READER")
        // .requestMatchers( HttpMethod.PUT , "/api/products/{id}").hasRole("ADMIN")
        // .requestMatchers( HttpMethod.DELETE , "/api/products/{id}").hasRole("ADMIN")
        .anyRequest()
        .authenticated())
        .addFilter(new JwtAuthenticationFilter(authenticationManager()))
        .addFilter(new JwtValidationFilter(authenticationManager()))
        .csrf(config -> config.disable())  // evitar vulneravilidad mediante formularios
        .sessionManagement(management -> management.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .build();
    }

@Bean
CorsConfigurationSource corsConfigurationSource() {
    CorsConfiguration config = new CorsConfiguration();
    config.setAllowedOrigins(Arrays.asList("*"));
    config.setAllowedMethods(Arrays.asList("*"));
    config.setAllowedHeaders(Arrays.asList("*"));
    //config.setAllowCredentials(true); -> no se usa con allowedOrigins con *

    UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
    source.registerCorsConfiguration("/**", config);
    return source;
}


    // @Bean
    // FilterRegistrationBean<CorsFilter> corsFilter() {
    //     FilterRegistrationBean<CorsFilter> corsBean = new FilterRegistrationBean<>(
    //             new CorsFilter(corsConfigurationSource()));
    //     corsBean.setOrder(Ordered.HIGHEST_PRECEDENCE);
    //     return corsBean;
    // }
}
