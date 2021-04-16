package net.scanner.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Record {

    @Id
    String url;

    public Record(String url) {
        this.url = url;
    }
}
