//package net.scanner.config;
//
//import org.springframework.security.access.AccessDeniedException;
//import org.springframework.security.web.access.AccessDeniedHandler;
//
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//public class AccessDeniedHandlerImpl implements AccessDeniedHandler {
//
//    @Override
//    public void handle(HttpServletRequest httpServletRequest, HttpServletResponse response, AccessDeniedException e) throws IOException, ServletException {
//        //TODO add a logger
//        response.sendError(HttpServletResponse.SC_FORBIDDEN, "Forbidden");
//    }
//}
