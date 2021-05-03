package net.scanner.exception;

public class MissingCredentialsRequestException extends RuntimeException {

    public MissingCredentialsRequestException(String message) {
        super(message);
    }
}
