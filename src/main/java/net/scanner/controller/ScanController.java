package net.scanner.controller;

import net.scanner.service.ScanService;
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


    @GetMapping(path = "/scan")
    public List<String> scanPage(@RequestParam String url) throws IOException, URISyntaxException {
        List<String> result = scanService.crawl(url);
        return result;
    }
}
