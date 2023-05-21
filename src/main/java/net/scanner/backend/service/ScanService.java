package net.scanner.backend.service;

import net.scanner.backend.security.TokenUtility;
import net.scanner.core.Scanner;
import net.scanner.hibernate.model.Credentials;
import net.scanner.hibernate.model.Scan;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URISyntaxException;

@Service
public class ScanService {

    @Autowired
    TokenUtility tokenUtility;

    @Autowired
    Scanner scanner;

    public Scan scan(Credentials urlObject, String authorizationHeader) throws IOException, URISyntaxException, ClassNotFoundException {
        int userId = tokenUtility.getUserIdFromHeader(authorizationHeader);
        return scanner.scan(urlObject, userId);
    }
}
