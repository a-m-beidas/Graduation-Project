package net.scanner.service;

import net.scanner.model.Record;
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

    List<String> crawlResult;
    URI crawlURI;

    public List<String> crawl(String originalURL) throws IOException, URISyntaxException {
        crawlResult = new LinkedList<String>();
        crawlURI = new URI(originalURL);
        processPage(originalURL);
        List<String> result = crawlResult;
        crawlResult = null;
        crawlURI = null;
        return result;
    }

    public void processPage(String url) throws IOException, URISyntaxException {
        URI uri = new URI(url);
        if (!uri.getHost().equals(crawlURI.getHost()) || recordRepository.findById(url).isPresent()) {
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
