package net.scanner.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToMany;
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

    private String targetURL;

    private ScanType type;

    private Date date;

    @OneToMany
    private List<Alert> alerts;

    public Scan(String targetURL, ScanType type) {
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
