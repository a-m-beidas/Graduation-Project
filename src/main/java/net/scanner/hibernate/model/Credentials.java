package net.scanner.hibernate.model;

import javax.persistence.Entity;

@Entity
public class Credentials {

    private String loginURL;
    private String username;
    private String password;

    public Credentials(String loginURL, String username, String password) {
        this.loginURL = loginURL;
        this.username = username;
        this.password = password;
    }

    public String getLoginURL() {
        return loginURL;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }
}
