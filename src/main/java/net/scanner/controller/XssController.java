package net.scanner.controller;

import net.scanner.service.XssService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping
public class XssController {

    @Autowired
    XssService xssService;

    @GetMapping(path = "/xss")
    ResponseEntity<String> xss(@RequestParam String url) throws IOException {
        return new ResponseEntity<String>(xssService.xss(url), HttpStatus.OK);
    }
}
