package net.scanner.backend.config;

import net.scanner.backend.model.User;
import net.scanner.backend.repository.UserRepository;
import net.scanner.hibernate.model.Alert;
import net.scanner.hibernate.model.Scan;
import net.scanner.hibernate.model.Scan.ScanType;
import net.scanner.hibernate.repository.ScanRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.LinkedList;

@SpringBootConfiguration
public class DatabaseDummyData {

    @Autowired
    UserRepository userRepository;

    @Autowired
    ScanRepository scanRepository;

    @Autowired
    BCryptPasswordEncoder bcryptEncoder;

    // @EventListener
    // void handleApplicationReadyEvent(ApplicationReadyEvent event) {
    //     ArrayList<User> users = new ArrayList<User>();
    //     users.add(new User("John", bcryptEncoder.encode("123")));
    //     users.add(new User("Matt", bcryptEncoder.encode("124")));
    //     users.add(new User("Blake", bcryptEncoder.encode("125")));
    //     users.add(new User("Candelaria", bcryptEncoder.encode("125")));
    //     users.add(new User("Leonia", bcryptEncoder.encode("125")));
    //     users.add(new User("Vanda", bcryptEncoder.encode("125")));
    //     users.add(new User("Maya", bcryptEncoder.encode("125")));
    //     users.add(new User("Tiera", bcryptEncoder.encode("125")));
    //     users.add(new User("Neil", bcryptEncoder.encode("125")));
    //     users.add(new User("Providencia", bcryptEncoder.encode("125")));
    //     users.add(new User("Truman", bcryptEncoder.encode("125")));
    //     users.add(new User("Pamila", bcryptEncoder.encode("125")));
    //     users.add(new User("Keshia", bcryptEncoder.encode("125")));
    //     users.add(new User("Hermelinda", bcryptEncoder.encode("125")));
    //     users.add(new User("Milford", bcryptEncoder.encode("125")));
    //     users.add(new User("Cristopher", bcryptEncoder.encode("125")));
    //     users.add(new User("Kareem", bcryptEncoder.encode("125")));
    //     users.add(new User("Guy", bcryptEncoder.encode("125")));
    //     users.add(new User("Su", bcryptEncoder.encode("125")));
    //     users.add(new User("Mariano", bcryptEncoder.encode("125")));
    //     users.add(new User("Dayle", bcryptEncoder.encode("125")));
    //     users.add(new User("Boyd", bcryptEncoder.encode("125")));
    //     users.add(new User("Janeth", bcryptEncoder.encode("125")));
    //     userRepository.saveAll(users);
    // }


    @EventListener
    void handleApplicationReadyEvent(ApplicationReadyEvent event) {
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
        // // Low
        // scan.addThreat(new Alert(
        //     "/about.php", 
        //     "Reflected cross site scripting",
        //     "Reflected attacks are those where the injected script is reflected off the web server, such as in an error message, search result, or any other response that includes some or all of the input sent to the server as part of the request. Reflected attacks are delivered to victims via another route, such as in an e-mail message, or on some other website. When a user is tricked into clicking on a malicious link, submitting a specially crafted form, or even just browsing to a malicious site, the injected code travels to the vulnerable web site, which reflects the attack back to the user’s browser. The browser then executes the code because it came from a \"trusted\" server. Reflected XSS is also sometimes referred to as Non-Persistent or Type-II XSS.\n\n More information about Cross-Site Scripting can be found here.", 
        //     "vulnerable example code:\n1: print (\"Hello\" . $_GET[\"name\"]);\n\nproof of concept:\n\n\npatch:\nEncode all user tainted data with PHP buildin functions before embedding the data into the output.\nMake sure to set the parameter ENT_QUOTES to avoid an eventhandler injections to existing\nHTML attributes and specify the correct charset.\n\n1: print (\"Hello\" . htmlentities($_GET\"nam\"], ENT_QUOTES, \"utf-8\");\nrelated securing functions:\nhtmlentities\nhtmlspecialchars\nhighlight_string", 
        //     3, 
        //     "POST",  
        //     20, 
        //     "WASC-08", 
        //     "name", 
        //     new LinkedList<String>()));


        // scan.addThreat(new Alert(
        //     "/help.php", 
        //     "Reflected cross site scripting",
        //     "Reflected attacks are those where the injected script is reflected off the web server, such as in an error message, search result, or any other response that includes some or all of the input sent to the server as part of the request. Reflected attacks are delivered to victims via another route, such as in an e-mail message, or on some other website. When a user is tricked into clicking on a malicious link, submitting a specially crafted form, or even just browsing to a malicious site, the injected code travels to the vulnerable web site, which reflects the attack back to the user’s browser. The browser then executes the code because it came from a \"trusted\" server. Reflected XSS is also sometimes referred to as Non-Persistent or Type-II XSS.\n\n More information about Cross-Site Scripting can be found here.", 
        //     "vulnerable example code:\n1: print (\"Hello\" . $_GET[\"name\"]);\n\nproof of concept:\n\n\npatch:\nEncode all user tainted data with PHP buildin functions before embedding the data into the output.\nMake sure to set the parameter ENT_QUOTES to avoid an eventhandler injections to existing\nHTML attributes and specify the correct charset.\n\n1: print (\"Hello\" . htmlentities($_GET\"nam\"], ENT_QUOTES, \"utf-8\");\nrelated securing functions:\nhtmlentities\nhtmlspecialchars\nhighlight_string", 
        //     3, 
        //     "POST",  
        //     20, 
        //     "WASC-08", 
        //     "name", 
        //     new LinkedList<String>()));
        
        scanRepository.save(scan);
    }
}
