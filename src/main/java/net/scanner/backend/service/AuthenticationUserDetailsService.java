package net.scanner.backend.service;


import net.scanner.backend.exception.AuthenticationJWTException;
import net.scanner.backend.model.AuthenticationUserDetails;
import net.scanner.backend.model.User;
import net.scanner.backend.security.RequestFilter;
import net.scanner.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class AuthenticationUserDetailsService implements UserDetailsService {

    @Autowired
    UserRepository repository;

    @Autowired
    PasswordEncoder bcryptEncoder;

    public AuthenticationUserDetailsService(UserRepository repository) {
        super();
    }

    /**
     * Used by {@link AuthenticationService#authenticate(User)} and {@link RequestFilter}
     * Overrides the {@link UserDetailsService#loadUserByUsername(String)} method
     * @return returns {@link AuthenticationUserDetails}
     */
    @Override
    public AuthenticationUserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repository.findByUsername(username);
        if (user == null) {
            throw new AuthenticationJWTException("Username not found");
        }
//        ArrayList<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>(user.getRoles().size());
        return new AuthenticationUserDetails(user.getUsername(), user.getPassword(), user.getId(), user.getDatabaseToken(), Collections.singleton(new SimpleGrantedAuthority("user")));
    }

    public User save(User user) {
        user.setPassword(bcryptEncoder.encode(user.getPassword()));
        return repository.save(user);
    }
}