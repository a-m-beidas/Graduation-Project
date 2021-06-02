package net.scanner.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfiguration implements WebMvcConfigurer {

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/login").setViewName("forward:/");
        registry.addViewController("/register").setViewName("forward:/");
        registry.addViewController("/scan").setViewName("forward:/");
        registry.addViewController("/crawl").setViewName("forward:/");
        registry.addViewController("/logout").setViewName("forward:/");
        registry.addViewController("/error").setViewName("forward:/");
    }


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**").allowedOrigins("http://localhost:3000");
    }
}