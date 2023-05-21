package net.scanner.backend.model;

import javax.persistence.*;
import java.util.ArrayList;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private int id;
    private String username;
    private String password;

    @Column(name = "token_in_database")
    /**
     * If negative this means that the token has expired, if positive then it has not
     */
    private int databaseToken;

    public User() {

    }

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public int getDatabaseToken() {
        return databaseToken;
    }

    public int getId() {
        return id;
    }

    public String getUsername() {
        return username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

}
