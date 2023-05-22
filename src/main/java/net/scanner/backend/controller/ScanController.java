package net.scanner.backend.controller;

import net.scanner.backend.service.ReportService;
import net.scanner.backend.service.ScanService;
import net.scanner.hibernate.model.Credentials;
import net.scanner.hibernate.model.Scan;
import org.springframework.beans.factory.annotation.Autowired;
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
    ReportService reportService;

    @PostMapping(path = "/scan")
    public Scan scanPage(@RequestHeader("Authorization") String authorizationHeader, @RequestBody Credentials url) throws IOException, URISyntaxException, ClassNotFoundException {
        Scan scan = scanService.scan(url, authorizationHeader);
        return scan;
    }

    @GetMapping("/report")
    public Scan report(@RequestHeader("Authorization") String authorizationHeader, @RequestParam int id) throws Exception {
        return reportService.getScan(id, authorizationHeader);
    }

    @GetMapping("/reports")
    public List<Scan> reports(@RequestHeader("Authorization") String authorizationHeader) throws Exception {
        return reportService.getScans(authorizationHeader);
    }
}
