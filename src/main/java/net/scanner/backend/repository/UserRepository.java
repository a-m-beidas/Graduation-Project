package net.scanner.backend.repository;

import net.scanner.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

public interface UserRepository extends JpaRepository<User, String> {

    User findByUsername(String username);

    @Modifying
    @Transactional
    @Query(value = "UPDATE users SET token_in_database=ABS(token_in_database)+1 WHERE username=?1", nativeQuery = true)
    void login(String username);

    @Modifying
    @Transactional
    @Query(value = "UPDATE users SET token_in_database=(ABS(token_in_database) * -1) -1 WHERE id=?1", nativeQuery = true)
    void logout(int userId);

}
