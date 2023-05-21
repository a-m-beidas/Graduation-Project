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
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.server.ResponseStatusException;
import org.openqa.selenium.By;
import org.openqa.selenium.ElementNotInteractableException;
import org.openqa.selenium.StaleElementReferenceException;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.firefox.FirefoxOptions;

import java.io.IOException;
import java.net.URISyntaxException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collections;
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
        System.out.println(urlObject);
        if (!urlObject.getUsername().equals("") && !urlObject.getPassword().equals(""))
            targetLogin(urlObject);
        String targetURL = urlObject.getTargetURL();
        List<String> urls = spider.crawl(targetURL);
        Scan scan = new Scan(userId, urlObject.getTargetURL(), Scan.ScanType.actual, urls);
        for (String url : urls) {
            Alert alert = xss.executeScan(url);
            if (alert != null) {
                scan.addThreat(alert);
            } else {
                scan.addThreat(Alert.createSecureAlert(url, "POST", ""));
            }
        }
        for (int i = 0; i < urls.size(); i++) {
            urls.set(i, new URL(urls.get(i)).getPath());
        }
        scanRepository.save(scan);
        return scan;
    }

    public void targetLogin(Credentials urlObject) throws IOException {
        try {
            ResponseEntity<String> response = restTemplate.exchange(urlObject.getTargetURL(), HttpMethod.GET, null, String.class);
        } catch (HttpClientErrorException e) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Login URL returned 404 Status Code");
        }
        System.out.println("Logging in....");
        // System.setProperty("webdriver.gecko.driver","C:\\Users\\ahmad.beidas\\Downloads\\geckodriver.exe");
        // System.setProperty("webdriver.http.factory", "jdk-http-client");
        FirefoxOptions options = new FirefoxOptions();
        // options.setHeadless(true);
        WebDriver driver = new FirefoxDriver(options);
        driver.get(urlObject.getTargetURL());
        try{
            Thread.sleep(2000);
        } catch (InterruptedException e) {
            System.out.println(e);
        }
        List<WebElement> textInputs = driver.findElements(By.xpath("//input[@type='text']"));
        List<WebElement> passwordInputs = driver.findElements(By.xpath("//input[@type='password']"));
        List<WebElement> buttons = driver.findElements(By.xpath("//button[contains(text(), 'تسجيل الدخول')]"));
        for (WebElement webElement : textInputs) {
            try {
                webElement.sendKeys(urlObject.getUsername());
            } catch (ElementNotInteractableException e) {

            } catch (StaleElementReferenceException e) {
                
            }
        }
        for (WebElement webElement : passwordInputs) {
            try {
                webElement.sendKeys(urlObject.getPassword());
            } catch (ElementNotInteractableException e) {

            } catch (StaleElementReferenceException e) {
                
            }
        }
        for (WebElement webElement : buttons) {
            webElement.click();
        }
        System.out.println(textInputs.size());
        System.out.println(passwordInputs.size());
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
