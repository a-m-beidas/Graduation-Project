package net.scanner.controller;

import net.scanner.service.ScanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping
public class ScanController {

    @Autowired
    ScanService scanService;

    @GetMapping(path = "/scan")
    public ResponseEntity<String> scanPage(@RequestParam String url) throws IOException {
        return new ResponseEntity<String>(scanService.processPage(url), HttpStatus.OK);
    }
}
