package net.scanner.security;

import net.scanner.config.AuthenticationEntryPointImpl;
import net.scanner.controller.AccessDeniedHandlerImpl;
import net.scanner.service.AuthenticationUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AuthenticationUserDetailsService userDetailsService;

    @Autowired
    private RequestFilter requestFilter;

    @Autowired
    BCryptPasswordEncoder passwordEncoder;

    @Value("${spring.profiles.active}")
    private String activeProfile;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        if (activeProfile.equals("dev")) {
            http.cors();
        }
        http
            .csrf().disable()
            .authorizeRequests()
                // API
                .antMatchers(HttpMethod.POST,"/api/register", "/api/login").permitAll()
                .antMatchers(HttpMethod.GET,"/api/scan", "/api/xss").authenticated()
                .antMatchers(HttpMethod.HEAD,"/api/check", "/api/logout").authenticated()
                // Web Application, permitAll
                .antMatchers(HttpMethod.GET,"/", "/xss", "/scan", "/api/report", "/login", "/register", "/logout", "/error").permitAll()
                // Webpack
                .antMatchers(HttpMethod.GET, "/built/bundle.js", "/built/bundle.js.map").permitAll()
                // Bootstrap
                .antMatchers(HttpMethod.GET, "/bootstrap.min.css", "/bootstrap.min.css.map").permitAll()
                // Icons
                .antMatchers(HttpMethod.GET, "/favicon.ico", "/logo192.png", "/default-placeholder.png").permitAll()
                //Otherwise Deny any access even if authenticated
                .anyRequest().denyAll()
            .and()
            .exceptionHandling()
                .accessDeniedHandler(new AccessDeniedHandlerImpl())
                .authenticationEntryPoint(new AuthenticationEntryPointImpl())
            .and()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
            .and()
                .addFilterBefore(requestFilter, UsernamePasswordAuthenticationFilter.class)
                //TODO is this correct?
                .logout().disable();

    }

    @Autowired
    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
}
