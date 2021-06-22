package net.scanner.backend.controller;

import com.fasterxml.jackson.databind.JsonNode;
import net.scanner.hibernate.model.Scan;
import net.scanner.backend.service.ReportService;
import net.scanner.backend.service.ScanService;
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

    @GetMapping(path = "/scan")
    public Scan scanPage(@RequestHeader("Authorization") String authorizationHeader, @RequestParam String url) throws IOException, URISyntaxException, ClassNotFoundException {
        return scanService.scan(url, authorizationHeader);
    }

    @GetMapping("/report")
    public Scan report(@RequestHeader("Authorization") String authorizationHeader, @RequestParam int id) throws Exception {
        return reportService.getScan(id, authorizationHeader);
    }
}
