package core;

import core.model.Alert;

import java.io.IOException;
import java.net.URISyntaxException;

public interface ActiveScanner {
    public Alert executeScan(String url) throws IOException, URISyntaxException;
}
