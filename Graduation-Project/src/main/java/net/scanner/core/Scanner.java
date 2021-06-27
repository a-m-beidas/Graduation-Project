package net.scanner.core;

import net.scanner.backend.config.Interceptor;
import net.scanner.core.active.XSS;
import net.scanner.hibernate.model.Credentials;
import net.scanner.hibernate.model.Scan;
import net.scanner.hibernate.model.Alert;
import net.scanner.hibernate.repository.ScanRepository;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Element;
import org.jsoup.select.Evaluator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.*;
import org.springframework.http.client.BufferingClientHttpRequestFactory;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
import java.util.LinkedList;
import java.util.List;

@Configuration
public class Scanner {

    @Autowired
    Spider spider;

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    HttpHeaders httpHeaders;

    @Autowired
    XSS xss;

    @Autowired
    ScanRepository scanRepository;
    // TODO multi-threading
    public Scan scan(Credentials urlObject, int userId) throws IOException, URISyntaxException, ClassNotFoundException {
        if (urlObject.getUsername() != null && urlObject.getPassword() != null)
            targetLogin(urlObject);
        String targetURL = urlObject.getTargetURL();
        List<String> urls = spider.crawl(targetURL);
        Scan scan = new Scan(userId, urlObject.getTargetURL(), Scan.ScanType.partial, urls);
        for (String url : urls) {
            List<Alert> alerts = xss.executeScan(url);
            if (!alerts.isEmpty()) {
                scan.addAlerts(alerts);
            }
        }
        for (int i = 0; i < urls.size(); i++) {
            urls.set(i, new URL(urls.get(i)).getPath());
        }
        scanRepository.save(scan);
        return scan;
    }

    public void targetLogin(Credentials urlObject) throws IOException {
        HttpHeaders headerProbe = restTemplate.headForHeaders(urlObject.getLoginURL());
        if (headerProbe.get("Set-Cookie") != null) {
            httpHeaders.put("Cookie", headerProbe.get("Set-Cookie"));
        }
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        map.put("login", Collections.singletonList(urlObject.getUsername()));
        map.put("password", Collections.singletonList(urlObject.getPassword()));
        map.put("security_level", Collections.singletonList(0 + ""));
        map.put("form", Collections.singletonList("submit"));
        HttpEntity<MultiValueMap> request = new HttpEntity<MultiValueMap>(map, httpHeaders);
        ResponseEntity<String> response = restTemplate.exchange(urlObject.getLoginURL(), HttpMethod.POST, request, String.class);
        httpHeaders.put("Cookie", response.getHeaders().get("Set-Cookie"));
    }

    @Bean
    RestTemplate setTemplate() {
        RestTemplate restTemplate = new RestTemplate(new BufferingClientHttpRequestFactory(new SimpleClientHttpRequestFactory()));
        List<ClientHttpRequestInterceptor> interceptors = new ArrayList<>();
        interceptors.add(new Interceptor());
        restTemplate.setInterceptors(interceptors);
        return restTemplate;
    }

    @Bean
    HttpHeaders setHttpHeaders() {
        HttpHeaders httpHeaders = new HttpHeaders();
//        httpHeaders.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        httpHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        return httpHeaders;
    }
}
