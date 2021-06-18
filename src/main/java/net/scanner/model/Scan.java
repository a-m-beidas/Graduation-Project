package net.scanner.model;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;


@Entity
public class Scan {

    public enum ScanType {
        full, partial;
    }

    @Id
    @GeneratedValue
    private int id;

    private int userId;

    private String targetURL;

    private ScanType type;

    private Date date;

    @OneToMany(cascade= CascadeType.ALL)
    private List<Alert> alerts;

    public Scan() {

    }

    public Scan(int userId, String targetURL, ScanType type) {
        this.userId = userId;
        this.targetURL = targetURL;
        this.type = type;
        date = Date.valueOf(LocalDate.now());
        alerts = new LinkedList<Alert>();
    }

    public void addThreat(Alert alert) {
        alerts.add(alert);
    }

    public int getId() {
        return id;
    }

    public int getUserId() { return userId; }

    public String getTargetURL() {
        return targetURL;
    }

    public ScanType getType() {
        return type;
    }

    public Date getDate() {
        return date;
    }

    public List<Alert> getAlerts() {
        return alerts;
    }
}
