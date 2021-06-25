package net.scanner.core;

import net.scanner.hibernate.model.Alert;

import java.io.IOException;
import java.net.URISyntaxException;
import java.util.LinkedList;

public interface ActiveScanner {
    public LinkedList<Alert> executeScan(String url) throws IOException, URISyntaxException;
}
