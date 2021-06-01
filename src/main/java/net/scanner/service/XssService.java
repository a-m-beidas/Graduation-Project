package net.scanner.service;

import net.scanner.config.Interceptor;
import net.scanner.model.Alert;
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
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

import java.io.IOException;
import java.util.*;

@Service
public class XssService {

    @Autowired
    RestTemplate restTemplate;

    @Autowired
    HttpHeaders httpHeaders;

    String js_script = "<script>alert('hello')</script>";

    public Alert xss(String url) throws IOException {
    Alert alert = null;
    // get useful information
    Document doc = Jsoup.connect(url).get();
    Elements forms = doc.select("form");

//    Given a `url`, it prints all XSS vulnerable forms and
//    returns True if any is vulnerable, False otherwise
//    get all the forms from the URL
    boolean is_vulnerable = false;
    for (Element form: forms) {
        HashMap<String, Object> form_details = getFormDetails(form);
        String response = submitForm(url, form);
        System.out.println(response);
        if (response.contains("<script>")) {
            alert = new Alert(url, "xss", "Solve it urself", 1);
            is_vulnerable = true;
        }
    }
    return alert;
//        content = submit_form(form_details, url, js_script).content.decode()
//        if js_script in content:
//            print("[+] XSS Detected on {url}")
//            print("[*] Form details:")
//            pprint(form_details)
//            is_vulnerable = True
//                # won't break because we want to print available vulnerable forms
//    return is_vulnerable
////		System.out.println(formDetails.get("inputs").getClass());
//		LinkedList<HashMap<String, Object>> inputs = formDetails.get("inputs");
//		for (HashMap<String, String> hashMap : inputs) {
////	        # replace all text and search values with `value`
//	        if(input["type"].equals("text") || input["type"].equals("search"))
//	            input["value"] = value;
//
//		}
//		System.out.println(inputs);


//    content = submit_form(form_details, url, js_script).content.decode()
    }

    //    This function extracts all possible useful information about an HTML `form`
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
