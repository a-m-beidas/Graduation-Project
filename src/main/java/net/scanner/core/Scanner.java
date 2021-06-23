package net.scanner.core;

import net.scanner.core.active.XSS;
import net.scanner.hibernate.model.Scan;
import net.scanner.hibernate.model.Alert;
import net.scanner.hibernate.repository.ScanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

@Configuration
public class Scanner {

    @Autowired
    Spider spider;

    @Autowired
    XSS xss;

    @Autowired
    ScanRepository scanRepository;
    // TODO multi-threading
    public Scan scan(String targetURL, int userId) throws IOException, URISyntaxException, ClassNotFoundException {
        Scan scan = new Scan(userId, targetURL, Scan.ScanType.partial);
        List<String> urls = spider.crawl(targetURL);
        for (String url : urls) {
            Alert alert = xss.executeScan(url);
            if (alert != null) {
                scan.addThreat(alert);
            }
        }
        scanRepository.save(scan);
        return scan;
    }
}
