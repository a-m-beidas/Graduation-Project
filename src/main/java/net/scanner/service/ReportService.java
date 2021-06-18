package net.scanner.service;

import net.scanner.model.Scan;
import net.scanner.repository.ScanRepository;
import net.scanner.security.TokenUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ReportService {

    @Autowired
    TokenUtility tokenUtility;

    @Autowired
    ScanRepository scanRepository;

    public Scan getScan(int scanId, String authorizationHeader) throws ClassNotFoundException {
        int userId = tokenUtility.getUserIdFromHeader(authorizationHeader);
        Optional<Scan> scan = scanRepository.findById(scanId);
        return validateScan(scan, userId);
    }

    Scan validateScan(Optional<Scan> scanOptional, int userIdToken) {
        Scan scan = scanOptional.orElseThrow(() -> new Error("not found"));
        if (scan.getUserId() != userIdToken)
            throw new Error("not the corresponding user");
        return scan;
    }
}
