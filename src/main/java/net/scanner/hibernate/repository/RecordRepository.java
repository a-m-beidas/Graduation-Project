package net.scanner.hibernate.repository;

import net.scanner.hibernate.model.Record;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RecordRepository extends JpaRepository<Record, String> {

}