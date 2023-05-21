package net.scanner.hibernate.model;

import javax.persistence.*;
import java.sql.Date;
import java.time.LocalDate;
import java.util.LinkedList;
import java.util.List;


@Entity
public class Scan {

    public enum ScanType {
        actual, test;
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

    @Transient
    private List<String> urls;

    public Scan() {
        urls = new LinkedList<String>();
    }

    public Scan(Integer userId, String targetURL, ScanType type, List<String> urls) {
        this.userId = userId;
        this.targetURL = targetURL;
        this.type = type;
        date = Date.valueOf(LocalDate.now());
        alerts = new LinkedList<Alert>();
        this.urls = urls;
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

    public List<String> getUrls() { return urls; }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
}
