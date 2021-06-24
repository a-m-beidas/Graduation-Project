package net.scanner.hibernate.repository;

import net.scanner.hibernate.model.Credentials;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CredentialsRepository  extends JpaRepository<Credentials, String> {
}
