// package com.Springboot.ProyectoReny.security;

// import org.springframework.context.ApplicationContext;
// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;
// import org.springframework.validation.beanvalidation.SpringConstraintValidatorFactory;

// @Configuration
// public class ValidatorConfig {
//   @Bean
//     public LocalValidatorFactoryBean validatorFactory(ApplicationContext applicationContext) {
//         LocalValidatorFactoryBean factoryBean = new LocalValidatorFactoryBean();
//         factoryBean.setConstraintValidatorFactory(new SpringConstraintValidatorFactory(applicationContext.getAutowireCapableBeanFactory()));
//         return factoryBean;
//     }
// }
