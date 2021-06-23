package net.scanner.hibernate.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Transient;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;

@Entity(name = "alerts")
public class Alert {

    @Id
    @GeneratedValue
    private int id;

    private String path;

    private String type;

    @Transient
    private String description;

    @Transient
    private String fix;

    private int severity;

    private String method;

    @Transient
    private int cweid;

    @Transient
    private String wascid;

    private String parameter;

    @Transient
    private List<String> references;

    public Alert() {

    }

    private static String descriptionValue = "Reflected attacks are those where the injected script is reflected off the web server, such as in an error message, search result, or any other response that includes some or all of the input sent to the server as part of the request. Reflected attacks are delivered to victims via another route, such as in an e-mail message, or on some other website. When a user is tricked into clicking on a malicious link, submitting a specially crafted form, or even just browsing to a malicious site, the injected code travels to the vulnerable web site, which reflects the attack back to the user’s browser. The browser then executes the code because it came from a \"trusted\" server. Reflected XSS is also sometimes referred to as Non-Persistent or Type-II XSS.\n\n More information about Cross-Site Scripting can be found here.";
    private static String fixValue = "vulnerable example code:\n1: print (\"Hello\"  .  $_GET[\"name\"]);\n\nproof of concept:\n\n\npatch:\nEncode all user tainted data with PHP buildin functions before embedding the data into the output.\nMake sure to set the parameter ENT_QUOTES to avoid an eventhandler injections to existing\nHTML attributes and specify the correct charset.\n\n1: print (\"Hello\"  .  htmlentities($_GET\"nam\"],  ENT_QUOTES, \"utf-8\");\nrelated securing functions:\nhtmlentities\nhtmlspecialchars\nhighlight_string";
    private static int cweidValue = 20;
    private static String wascidValue = "WASC-08";
    private static List<String> referencesValue = Arrays.asList(new String[]{"http://projects.webappsec.org/Cross-Site-Scripting", "http://cwe.mitre.org/data/definitions/79.html"});


    public static Alert createAlert(String path, String method, String parameter) {
        return new Alert(path, "Reflected cross site scripting", descriptionValue, fixValue, 1, method, cweidValue, wascidValue, parameter, referencesValue);
    }

    private Alert(String path, String type, String description, String fix, int severity, String method, int cweid, String wascid, String parameter, List<String> references) {
        this.path = path;
        this.type = type;
        this.description = description;
        this.fix = fix;
        this.severity = severity;
        this.method = method;
        this.cweid = cweid;
        this.wascid = wascid;
        this.parameter = parameter;
        this.references = references;
    }

    public String getPath() {
        return path;
    }

    public String getType() {
        return type;
    }

    public String getDescription() {
        return description;
    }

    public String getFix() {
        return fix;
    }

    public int getSeverity() {
        return severity;
    }

    public String getMethod() {
        return method;
    }

    public int getCweid() {
        return cweid;
    }

    public String getWascid() {
        return wascid;
    }

    public String getParameter() {
        return parameter;
    }


    public List<String> getReferences() {
        return references;
    }
}
