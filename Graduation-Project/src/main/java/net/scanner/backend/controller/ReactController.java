package net.scanner.backend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller

public class ReactController {

    @RequestMapping(value = "/")
    public String index() {
        return "index";
    }

}
