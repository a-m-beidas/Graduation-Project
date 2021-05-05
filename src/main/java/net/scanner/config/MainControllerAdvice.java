package net.scanner.config;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class MainControllerAdvice {

    Logger logger = LoggerFactory.getLogger(MainControllerAdvice.class);

    @ExceptionHandler
    public ResponseEntity<String> genericHandler(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>("Bad Credentials", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
