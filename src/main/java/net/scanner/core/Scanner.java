package net.scanner.core;

import net.scanner.core.active.XSS;
import net.scanner.hibernate.model.Record;
import net.scanner.hibernate.model.Scan;
import net.scanner.hibernate.repository.RecordRepository;
import net.scanner.hibernate.model.Alert;
import net.scanner.hibernate.repository.ScanRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedList;
import java.util.List;

// TODO as a crawler
@Configuration
public class Scanner {

    @Autowired
    XSS xss;

    @Autowired
    RecordRepository recordRepository;

    @Autowired
    ScanRepository scanRepository;

    List<String> crawlResult;
    URI targetURL;

    public Scanner() {
        System.out.println("heree");
    }

    // TODO should model.Scanner be in the backend, or core?
    public Scan scan(String targetURL, int userId) throws IOException, URISyntaxException, ClassNotFoundException {
        targetURL = (!targetURL.contains("://")) ? "http://" + targetURL : targetURL;
        recordRepository.deleteAll();
        crawlResult = new LinkedList<String>();
        Scan scan = new Scan(userId, targetURL, Scan.ScanType.partial);
        this.targetURL = new URI(targetURL);
        processPage(targetURL);
        List<String> urls = crawlResult;
        for (String url: urls) {
            Alert alert = xss.executeScan(url);
            if (alert != null) {
                scan.addThreat(alert);
            }
        }
        crawlResult = null;
        this.targetURL = null;
        scanRepository.save(scan);
        return scan;
    }

    public void processPage(String url) throws IOException, URISyntaxException {
        URI uri = new URI(url);
        if (!uri.getHost().equals(this.targetURL.getHost()) || recordRepository.findById(url).isPresent()) {
            return;
        }
        recordRepository.save(new Record(url));
        //get useful information
        Document doc = Jsoup.connect(url).get();
        crawlResult.add(doc.location());
//			if(doc.text().contains("mit")){
//				System.out.println(URL);
//			}
        //get all links and recursively call the processPage method
        Elements questions = doc.select("a[href]");
        for (Element link : questions) {
//				if(link.attr("href").contains("mit.edu"))
            if (!link.attr("href").contains("#"))
                processPage(link.attr("abs:href"));
        }
        return;
    }
}
