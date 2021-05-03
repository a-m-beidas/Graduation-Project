package net.scanner.model;

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
