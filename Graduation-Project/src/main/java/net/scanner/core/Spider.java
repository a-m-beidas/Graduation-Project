package net.scanner.core;

import net.scanner.hibernate.model.Record;
import net.scanner.hibernate.repository.RecordRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.LinkedList;
import java.util.List;

@Component
public class Spider {

    @Autowired
    RecordRepository recordRepository;

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    HttpHeaders httpHeaders;

    List<String> crawlResult;
    URI targetURL;

    public List<String> crawl(String targetURL) throws IOException, URISyntaxException {
        recordRepository.deleteAll();
        targetURL = (!targetURL.contains("://")) ? "http://" + targetURL : targetURL;
        this.targetURL = new URI(targetURL);
        crawlResult = new LinkedList<String>();
        crawl_rec(targetURL);
        List<String> urls = crawlResult;
        crawlResult = null;
        this.targetURL = null;
        return urls;
    }

    public void crawl_rec(String url) throws IOException, URISyntaxException {
        URI uri = new URI(url);
        if (!uri.getHost().equals(this.targetURL.getHost()) || recordRepository.findById(url).isPresent())
            return;
        if (uri.getPath().contains("logout"))
            return;
        // TODO application needs to specify the logout url
        recordRepository.save(new Record(url));
        HttpEntity<?> entity = new HttpEntity<>(httpHeaders);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        Document doc = Jsoup.parse(response.getBody(), url);
        crawlResult.add(doc.location());
        Elements questions = doc.select("a[href]");
        for (Element link : questions) {
            if (!link.attr("href").contains("#"))
                crawl_rec(link.attr("abs:href"));
        }
        return;
    }
}
