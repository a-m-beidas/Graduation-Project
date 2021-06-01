package net.scanner.service;

import net.scanner.model.Alert;
import net.scanner.model.Record;
import net.scanner.model.Scan;
import net.scanner.repository.RecordRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedList;
import java.util.List;

@Service
public class ScanService {

    @Autowired
    RecordRepository recordRepository;

    @Autowired
    XssService xssService;

    List<String> crawlResult;
    URI targetURL;

    public Scan crawl(String targetURL) throws IOException, URISyntaxException {
        recordRepository.deleteAll();
        crawlResult = new LinkedList<String>();
        Scan scan = new Scan(targetURL, Scan.ScanType.partial);
        this.targetURL = new URI(targetURL);
        processPage(targetURL);
        List<String> urls = crawlResult;
        for (String url: urls) {
            Alert alert = xssService.xss(url);
            if (alert != null) {
                scan.addThreat(alert);
            }
        }
        crawlResult = null;
        this.targetURL = null;
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
