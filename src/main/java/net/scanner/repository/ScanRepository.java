package net.scanner.repository;

import net.scanner.model.Scan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScanRepository extends JpaRepository<Scan, String> {

}
