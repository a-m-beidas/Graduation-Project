package net.scanner.hibernate.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;

@Entity
public class Credentials {

    @Id
    @GeneratedValue
    private int id;

    private String loginURL;
    private String username;
    private String password;
    @Transient
    private String targetURL;

    public Credentials(String loginURL, String username, String password, String targetURL) {
        this.loginURL = targetURL + "/" + loginURL;
        this.loginURL = (!this.loginURL.contains("://")) ? "http://" + this.loginURL : this.loginURL;
        this.username = username;
        this.password = password;
        this.targetURL = targetURL;
    }

    public int getId() {
        return id;
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

    public String getTargetURL() { return targetURL; }
}
