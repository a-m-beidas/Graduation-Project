package net.scanner.model;

import net.scanner.security.TokenUtility;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;

import java.util.Collection;

/**
 * Extends {@link User} with an id field
 * works with {@link TokenUtility#generateToken(AuthenticationUserDetails)}
 */
public class AuthenticationUserDetails extends User {

    private final int id;
    private final int databaseToken;

    /**
     * Calls super {@link User} <br>
     * works with {@link TokenUtility#generateToken(AuthenticationUserDetails)}
     * @param username username
     * @param password password
     * @param userId
     * @param authorities
     */
    public AuthenticationUserDetails(String username, String password, int userId, int databaseToken, Collection<? extends GrantedAuthority> authorities) {
        //TODO use the fields inside the superclass
        super(username, password, authorities);
        id = userId;
        this.databaseToken = databaseToken;
    }

    /**
     * When logged out the the field databaseToken is set to its negative complement to denote that it is has expired
     * @return
     */
    public boolean isCurrentTokenExpired() {
        return databaseToken < 0;
    }

    public int getDatabaseToken() {
        return databaseToken;
    }

    public int getId() {
        return id;
    }
}
