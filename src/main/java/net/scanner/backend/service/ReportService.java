package net.scanner.backend.service;

import net.scanner.hibernate.model.Scan;
import net.scanner.hibernate.repository.ScanRepository;
import net.scanner.backend.security.TokenUtility;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReportService {

    @Autowired
    TokenUtility tokenUtility;

    @Autowired
    ScanRepository scanRepository;

    public Scan getScan(int scanId, String authorizationHeader) throws Exception {
        int userId = tokenUtility.getUserIdFromHeader(authorizationHeader);
        Optional<Scan> scan = scanRepository.findById(scanId);
        return validateScan(scan, userId);
    }

    public List<Scan> getScans(String authorizationHeader) throws Exception {
        int userId = tokenUtility.getUserIdFromHeader(authorizationHeader);
        List<Scan> scans = scanRepository.findAll();
        return scans;
    }

    Scan validateScan(Optional<Scan> scanOptional, int userIdToken) throws Exception {
        Scan scan = scanOptional.orElseThrow(() -> new Exception("Report not found"));
        if (scan.getUserId() != userIdToken)
            throw new Exception("Unauthorized: not the corresponding user");
        return scan;
    }
}
