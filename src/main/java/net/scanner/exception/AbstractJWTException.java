package net.scanner.exception;

public abstract class AbstractJWTException extends RuntimeException {

    private String token;

    AbstractJWTException(String message, String token) {
        super("Token: "+ token +  " ," + message);
    }
}
