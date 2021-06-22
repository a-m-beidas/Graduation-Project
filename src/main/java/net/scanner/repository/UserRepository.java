package net.scanner.hibernate.repository;

import net.scanner.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

public interface UserRepository extends JpaRepository<User, String> {

    User findByUsername(String username);

    @Modifying
    @Transactional
    @Query(value = "UPDATE users u SET u.token_in_database=ABS(u.token_in_database)+1 WHERE u.username=?1", nativeQuery = true)
    void login(String username);

    @Modifying
    @Transactional
    @Query(value = "UPDATE users u SET u.token_in_database=ABS(u.token_in_database) * -1, u.token_in_database=u.token_in_database-1 WHERE u.id=?1", nativeQuery = true)
    void logout(int userId);

}
