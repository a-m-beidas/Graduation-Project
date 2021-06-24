package net.scanner.backend.controller;

import net.scanner.backend.service.ReportService;
import net.scanner.backend.service.ScanService;
import net.scanner.hibernate.model.Credentials;
import net.scanner.hibernate.model.Scan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.net.URISyntaxException;

@RestController
@RequestMapping(path = "api")
public class ScanController {

    @Autowired
    ScanService scanService;

    @Autowired
    ReportService reportService;

    @PostMapping(path = "/scan")
    public Scan scanPage(@RequestHeader("Authorization") String authorizationHeader, @RequestBody Credentials url) throws IOException, URISyntaxException, ClassNotFoundException {
        return scanService.scan(url.getTargetURL(), authorizationHeader);
    }

    @GetMapping("/report")
    public Scan report(@RequestHeader("Authorization") String authorizationHeader, @RequestParam int id) throws Exception {
        return reportService.getScan(id, authorizationHeader);
    }
}
