package net.scanner.backend.exception;

public class MissingCredentialsRequestException extends RuntimeException {

    public MissingCredentialsRequestException(String message) {
        super(message);
    }
}
