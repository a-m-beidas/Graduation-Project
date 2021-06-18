package net.scanner.controller;

import net.scanner.model.Alert;
import net.scanner.model.Scan;
import net.scanner.service.ScanService;
import net.scanner.service.XssService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.List;

@RestController
@RequestMapping(path = "api")
public class ScanController {

    @Autowired
    ScanService scanService;

    @Autowired
    XssService xssService;

    @GetMapping(path = "/scan")
    public Scan scanPage(@RequestParam String url) throws IOException, URISyntaxException {
        Scan result = scanService.crawl(url);
        return result;
    }

    @GetMapping(path = "/xss")
    Alert xss(@RequestParam String url) throws IOException, URISyntaxException {
        Alert result = xssService.xss(url);
        return result;
    }
}
