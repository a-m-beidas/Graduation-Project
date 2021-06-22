package net.scanner.service;

import com.fasterxml.jackson.databind.JsonNode;
import net.scanner.security.TokenUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.net.URISyntaxException;

@Service
public class ScanService {

    @Autowired
    TokenUtility tokenUtility;


    public JsonNode scan(String targetURL, String authorizationHeader) throws IOException, URISyntaxException, ClassNotFoundException {
        int userId = tokenUtility.getUserIdFromHeader(authorizationHeader);
        return null;
    }
}
