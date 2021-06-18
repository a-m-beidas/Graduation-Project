package net.scanner.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {

    @Value("${spring.profiles.active}")
    private String activeProfile;

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/login").setViewName("forward:/");
        registry.addViewController("/register").setViewName("forward:/");
        registry.addViewController("/scan").setViewName("forward:/");
        registry.addViewController("/xss").setViewName("forward:/");
        registry.addViewController("/report").setViewName("forward:/");
        registry.addViewController("/logout").setViewName("forward:/");
        registry.addViewController("/error").setViewName("forward:/");
    }


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        if (activeProfile.equals("dev")) {
            registry.addMapping("/**").allowedOrigins("http://localhost:3000");
        }
    }
}