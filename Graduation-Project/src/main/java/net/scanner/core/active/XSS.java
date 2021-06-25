package net.scanner.core.active;

import net.scanner.core.ActiveScanner;
import net.scanner.backend.config.Interceptor;
import net.scanner.hibernate.model.Alert;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.*;
import org.springframework.http.client.BufferingClientHttpRequestFactory;
import org.springframework.http.client.ClientHttpRequestInterceptor;
import org.springframework.http.client.SimpleClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.*;

@Component
public class XSS implements ActiveScanner {

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    HttpHeaders httpHeaders;

    String js_script = "<script>alert('hello')</script>";

    @Override
    public Alert executeScan(String url) throws IOException, URISyntaxException {
        Alert alert = null;
        url = (!url.contains("://")) ? "http://" + url : url;
        HttpEntity<?> entity = new HttpEntity<>(httpHeaders);
        ResponseEntity<String> response_get = restTemplate.exchange(url, HttpMethod.GET, entity, String.class);
        Document doc = Jsoup.parse(response_get.getBody(), url);
        url = doc.location();
        Elements forms = doc.select("form");
        boolean is_vulnerable = false;
        for (Element form: forms) {
            HashMap<String, Object> form_details = getFormDetails(form);
            String response = submitForm(url, form);
            if (response == null) {
                continue;
            }
            if (response.contains("<script>")) {
                URI uri = new URI(url);
                alert = Alert.createAlert(uri.getPath(), "POST", "username");
                is_vulnerable = true;
            }
        }
        return alert;
    }

    private static HashMap<String, Object> getFormDetails(Element form) {
        HashMap<String, Object> details = new HashMap<>();

        //get the form action (target url)
        String action = form.attr("action");
        //get the form method (POST, GET, etc.)
        String method = form.attr("method");

        //get all the input details such as type and name
        LinkedList<HashMap<String, String>> inputs = new LinkedList<>();
        for (Element element : form.select("input")) {
            HashMap<String, String> map = new HashMap<>();
            String inputType = element.attr("type");
            if (inputType.equals(""))
                inputType = "text";

            String inputName = element.attr("name");
            map.put("type", inputType);
            map.put("name", inputName);
            inputs.add(map);
        }

        details.put("action", action);
        details.put("method", method);
        details.put("inputs", inputs);
        return details;

    }

    String submitForm(String url, Element form) {
        MultiValueMap<String, String> map = new LinkedMultiValueMap<>();
        for (Element element: form.select("input")) {
            if (!element.attr("type").equals("text") && !element.attr("type").equals("password"))
                continue;
            String name = element.attr("name");
            map.put(name, Collections.singletonList(js_script));
        }
        HttpEntity<MultiValueMap> request = new HttpEntity<MultiValueMap>(map, httpHeaders);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, request, String.class);
        return response.getBody();
    }
}