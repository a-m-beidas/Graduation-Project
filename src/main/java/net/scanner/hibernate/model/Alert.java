package core.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity(name = "alerts")
public class Alert {

    @Id
    @GeneratedValue
    private int id;

    private String url;

    private String type;

    //  Solution
    private String description;

    private int severity;

    public Alert() {

    }
    public Alert(String url, String type, String description, int severity) {
        this.url = url;
        this.type = type;
        this.description = description;
        this.severity = severity;
    }

    public int getId() {
        return id;
    }

    public String getUrl() {
        return url;
    }

    public String getType() {
        return type;
    }

    public String getDescription() {
        return description;
    }

    public int getSeverity() {
        return severity;
    }
}
