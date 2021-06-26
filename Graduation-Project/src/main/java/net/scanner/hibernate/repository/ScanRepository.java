package net.scanner.hibernate.repository;

import net.scanner.hibernate.model.Scan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ScanRepository extends JpaRepository<Scan, Integer> {

    @Query(nativeQuery = true, value="insert into transfer_transactions (by_user, to_user, transaction_type, amount, date) value (?,?,?,?,?)")
    List<Scan> findByUserId(int userId);
}
