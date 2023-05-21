package net.scanner.core;

import java.util.LinkedList;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import net.scanner.hibernate.model.Alert;
import net.scanner.hibernate.model.Scan;
import net.scanner.hibernate.model.Scan.ScanType;
import net.scanner.hibernate.repository.ScanRepository;

public class AddDummyScanTest {

    @Autowired
    ScanRepository scanRepository;

    @Test
    void handleApplicationReadyEvent() {
        // "alerts": [{, , "severity": 2, "method": "POST", "cweid": 20, "wascid": "WASC-08", "parameter": "username", "references": ["http://projects.webappsec.org/Cross-Site-Scripting", "http://cwe.mitre.org/data/definitions/79.html"] }, { "path": "/login.php", "type": "Reflected cross site scripting", "description": "Reflected attacks are those where the injected script is reflected off the web server, such as in an error message, search result, or any other response that includes some or all of the input sent to the server as part of the request. Reflected attacks are delivered to victims via another route, such as in an e-mail message, or on some other website. When a user is tricked into clicking on a malicious link, submitting a specially crafted form, or even just browsing to a malicious site, the injected code travels to the vulnerable web site, which reflects the attack back to the user’s browser. The browser then executes the code because it came from a \"trusted\" server. Reflected XSS is also sometimes referred to as Non-Persistent or Type-II XSS.\n\n More information about Cross-Site Scripting can be found here.", "fix": "vulnerable example code:\n1: print (\"Hello\" . $_GET[\"name\"]);\n\nproof of concept:\n\n\npatch:\nEncode all user tainted data with PHP buildin functions before embedding the data into the output.\nMake sure to set the parameter ENT_QUOTES to avoid an eventhandler injections to existing\nHTML attributes and specify the correct charset.\n\n1: print (\"Hello\" . htmlentities($_GET\"nam\"], ENT_QUOTES, \"utf-8\");\nrelated securing functions:\nhtmlentities\nhtmlspecialchars\nhighlight_string", "severity": 3, "method": "POST", "cweid": 20, "wascid": "WASC-08", "parameter": "username", "references": ["http://projects.webappsec.org/Cross-Site-Scripting", "http://cwe.mitre.org/data/definitions/79.html"] }] }
        Scan scan = new Scan(1, "localhost:8080", ScanType.test, new LinkedList<String>());
        // "http://projects.webappsec.org/Cross-Site-Scripting", "http://cwe.mitre.org/data/definitions/79.html"
        // High
        scan.addThreat(new Alert(
            "/login.php",
            "Reflected cross site scripting",
            "Reflected attacks are those where the injected script is reflected off the web server, such as in an error message, search result, or any other response that includes some or all of the input sent to the server as part of the request. Reflected attacks are delivered to victims via another route, such as in an e-mail message, or on some other website. When a user is tricked into clicking on a malicious link, submitting a specially crafted form, or even just browsing to a malicious site, the injected code travels to the vulnerable web site, which reflects the attack back to the user’s browser. The browser then executes the code because it came from a \"trusted\" server. Reflected XSS is also sometimes referred to as Non-Persistent or Type-II XSS.\n\n More information about Cross-Site Scripting can be found here.", 
            "vulnerable example code:\n1: print (\"Hello\" . $_GET[\"name\"]);\n\nproof of concept:\n\n\npatch:\nEncode all user tainted data with PHP buildin functions before embedding the data into the output.\nMake sure to set the parameter ENT_QUOTES to avoid an eventhandler injections to existing\nHTML attributes and specify the correct charset.\n\n1: print (\"Hello\" . htmlentities($_GET\"nam\"], ENT_QUOTES, \"utf-8\");\nrelated securing functions:\nhtmlentities\nhtmlspecialchars\nhighlight_string", 
            1,
            "POST",
            20,
            "WASC-08",
            "username",
            new LinkedList<String>()));
        
        scan.addThreat(new Alert(
            "/register.php",
            "Reflected cross site scripting",
            "Reflected attacks are those where the injected script is reflected off the web server, such as in an error message, search result, or any other response that includes some or all of the input sent to the server as part of the request. Reflected attacks are delivered to victims via another route, such as in an e-mail message, or on some other website. When a user is tricked into clicking on a malicious link, submitting a specially crafted form, or even just browsing to a malicious site, the injected code travels to the vulnerable web site, which reflects the attack back to the user’s browser. The browser then executes the code because it came from a \"trusted\" server. Reflected XSS is also sometimes referred to as Non-Persistent or Type-II XSS.\n\n More information about Cross-Site Scripting can be found here.", 
            "vulnerable example code:\n1: print (\"Hello\" . $_GET[\"name\"]);\n\nproof of concept:\n\n\npatch:\nEncode all user tainted data with PHP buildin functions before embedding the data into the output.\nMake sure to set the parameter ENT_QUOTES to avoid an eventhandler injections to existing\nHTML attributes and specify the correct charset.\n\n1: print (\"Hello\" . htmlentities($_GET\"nam\"], ENT_QUOTES, \"utf-8\");\nrelated securing functions:\nhtmlentities\nhtmlspecialchars\nhighlight_string", 
            1,
            "POST",
            20,
            "WASC-08",
            "username",
            new LinkedList<String>()));
            


        // Medium
        scan.addThreat(
            new Alert("/home.php", 
            "Reflected cross site scripting",
            "Reflected attacks are those where the injected script is reflected off the web server, such as in an error message, search result, or any other response that includes some or all of the input sent to the server as part of the request. Reflected attacks are delivered to victims via another route, such as in an e-mail message, or on some other website. When a user is tricked into clicking on a malicious link, submitting a specially crafted form, or even just browsing to a malicious site, the injected code travels to the vulnerable web site, which reflects the attack back to the user’s browser. The browser then executes the code because it came from a \"trusted\" server. Reflected XSS is also sometimes referred to as Non-Persistent or Type-II XSS.\n\n More information about Cross-Site Scripting can be found here.", 
            "vulnerable example code:\n1: print (\"Hello\" . $_GET[\"name\"]);\n\nproof of concept:\n\n\npatch:\nEncode all user tainted data with PHP buildin functions before embedding the data into the output.\nMake sure to set the parameter ENT_QUOTES to avoid an eventhandler injections to existing\nHTML attributes and specify the correct charset.\n\n1: print (\"Hello\" . htmlentities($_GET\"nam\"], ENT_QUOTES, \"utf-8\");\nrelated securing functions:\nhtmlentities\nhtmlspecialchars\nhighlight_string", 
            2, 
            "POST",  
            20, 
            "WASC-08", 
            "search", 
            new LinkedList<String>()));
        // Low
        scan.addThreat(new Alert(
            "/about.php", 
            "Reflected cross site scripting",
            "Reflected attacks are those where the injected script is reflected off the web server, such as in an error message, search result, or any other response that includes some or all of the input sent to the server as part of the request. Reflected attacks are delivered to victims via another route, such as in an e-mail message, or on some other website. When a user is tricked into clicking on a malicious link, submitting a specially crafted form, or even just browsing to a malicious site, the injected code travels to the vulnerable web site, which reflects the attack back to the user’s browser. The browser then executes the code because it came from a \"trusted\" server. Reflected XSS is also sometimes referred to as Non-Persistent or Type-II XSS.\n\n More information about Cross-Site Scripting can be found here.", 
            "vulnerable example code:\n1: print (\"Hello\" . $_GET[\"name\"]);\n\nproof of concept:\n\n\npatch:\nEncode all user tainted data with PHP buildin functions before embedding the data into the output.\nMake sure to set the parameter ENT_QUOTES to avoid an eventhandler injections to existing\nHTML attributes and specify the correct charset.\n\n1: print (\"Hello\" . htmlentities($_GET\"nam\"], ENT_QUOTES, \"utf-8\");\nrelated securing functions:\nhtmlentities\nhtmlspecialchars\nhighlight_string", 
            3, 
            "POST",  
            20, 
            "WASC-08", 
            "name", 
            new LinkedList<String>()));


        scan.addThreat(new Alert(
            "/help.php", 
            "Reflected cross site scripting",
            "Reflected attacks are those where the injected script is reflected off the web server, such as in an error message, search result, or any other response that includes some or all of the input sent to the server as part of the request. Reflected attacks are delivered to victims via another route, such as in an e-mail message, or on some other website. When a user is tricked into clicking on a malicious link, submitting a specially crafted form, or even just browsing to a malicious site, the injected code travels to the vulnerable web site, which reflects the attack back to the user’s browser. The browser then executes the code because it came from a \"trusted\" server. Reflected XSS is also sometimes referred to as Non-Persistent or Type-II XSS.\n\n More information about Cross-Site Scripting can be found here.", 
            "vulnerable example code:\n1: print (\"Hello\" . $_GET[\"name\"]);\n\nproof of concept:\n\n\npatch:\nEncode all user tainted data with PHP buildin functions before embedding the data into the output.\nMake sure to set the parameter ENT_QUOTES to avoid an eventhandler injections to existing\nHTML attributes and specify the correct charset.\n\n1: print (\"Hello\" . htmlentities($_GET\"nam\"], ENT_QUOTES, \"utf-8\");\nrelated securing functions:\nhtmlentities\nhtmlspecialchars\nhighlight_string", 
            3, 
            "POST",  
            20, 
            "WASC-08", 
            "name", 
            new LinkedList<String>()));
        
        scanRepository.save(scan);
    }
    
}
