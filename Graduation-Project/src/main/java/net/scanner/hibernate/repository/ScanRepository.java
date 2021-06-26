package net.scanner.hibernate.repository;

import net.scanner.hibernate.model.Scan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ScanRepository extends JpaRepository<Scan, Integer> {

    @Query(nativeQuery = true, value="SELECT * FROM scan WHERE user_id = ?")
    List<Scan> findByUserId(int userId);
}
