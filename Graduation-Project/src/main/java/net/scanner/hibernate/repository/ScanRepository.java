package net.scanner.hibernate.repository;

import net.scanner.hibernate.model.Scan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ScanRepository extends JpaRepository<Scan, Integer> {

}
