package net.scanner.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.ArrayList;

@Entity
public class User {

    @Id
    @GeneratedValue
    @Column(name = "id", columnDefinition = "INT UNSIGNED")
    private int id;
    private String username;
    private String password;

    @Column(name = "token_in_database")
    /**
     * If negative this means that the token has expired, if positive then it has not
     */
    private int databaseToken;

    public User(String username, String password) {
        this.username = username;
        this.password = password;
    }
}
