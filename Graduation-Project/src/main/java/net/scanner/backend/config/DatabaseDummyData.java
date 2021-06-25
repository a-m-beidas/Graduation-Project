package net.scanner.backend.config;

import net.scanner.backend.model.User;
import net.scanner.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;

@SpringBootConfiguration
public class DatabaseDummyData {

    @Autowired
    UserRepository userRepository;

    @Autowired
    BCryptPasswordEncoder bcryptEncoder;

    @EventListener
    void handleApplicationReadyEvent(ApplicationReadyEvent event) {
        ArrayList<User> users = new ArrayList<User>();
        users.add(new User("John", bcryptEncoder.encode("123")));
        users.add(new User("Matt", bcryptEncoder.encode("124")));
        users.add(new User("Blake", bcryptEncoder.encode("125")));
        users.add(new User("Candelaria", bcryptEncoder.encode("125")));
        users.add(new User("Leonia", bcryptEncoder.encode("125")));
        users.add(new User("Vanda", bcryptEncoder.encode("125")));
        users.add(new User("Maya", bcryptEncoder.encode("125")));
        users.add(new User("Tiera", bcryptEncoder.encode("125")));
        users.add(new User("Neil", bcryptEncoder.encode("125")));
        users.add(new User("Providencia", bcryptEncoder.encode("125")));
        users.add(new User("Truman", bcryptEncoder.encode("125")));
        users.add(new User("Pamila", bcryptEncoder.encode("125")));
        users.add(new User("Keshia", bcryptEncoder.encode("125")));
        users.add(new User("Hermelinda", bcryptEncoder.encode("125")));
        users.add(new User("Milford", bcryptEncoder.encode("125")));
        users.add(new User("Cristopher", bcryptEncoder.encode("125")));
        users.add(new User("Kareem", bcryptEncoder.encode("125")));
        users.add(new User("Guy", bcryptEncoder.encode("125")));
        users.add(new User("Su", bcryptEncoder.encode("125")));
        users.add(new User("Mariano", bcryptEncoder.encode("125")));
        users.add(new User("Dayle", bcryptEncoder.encode("125")));
        users.add(new User("Boyd", bcryptEncoder.encode("125")));
        users.add(new User("Janeth", bcryptEncoder.encode("125")));
        userRepository.saveAll(users);
    }
}
