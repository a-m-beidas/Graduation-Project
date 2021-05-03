package net.scanner.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import net.scanner.controller.AuthenticationController;
import net.scanner.exception.IllegalJWTException;
import net.scanner.model.AuthenticationUserDetails;
import net.scanner.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.io.Serializable;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class TokenUtility implements Serializable {

    private static final long serialVersionUID = -2550185165626007488L;
    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;
    @Value("${jwt.secret}")
    private String secret;

    //retrieve username from jwt token
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    //retrieve expiration date from jwt token
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    /**
     * Cuts the authorization request header and gets the token then query the token to JWTs to retrieve the userId
     * @param authorizationHeader the "Authorization" header as recieve from the controller
     * @return the userId retrieved
     * @throws ClassNotFoundException if token is invalid
     */
    public int getUserIdFromHeader(String authorizationHeader) throws ClassNotFoundException {
        String token = authorizationHeader.substring(7);
        Claims claims = getAllClaimsFromToken(token);
        Object id = claims.get("id");
        if (id == null) {
            throw new IllegalJWTException("Token is valid but does not store any id", token);
        }
        return (int) id;
    }

    public int getDatabaseTokenFromToken(String token) {
        Claims claims = getAllClaimsFromToken(token);
        Object databaseToken = claims.get("database_token");
        if (databaseToken == null)
            throw new IllegalJWTException("Token is valid but does not store the database of the Token", token);
        return (int) databaseToken;
    }

    //for retrieving any information from token we will need the secret key
    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parser().setSigningKey(secret).parseClaimsJws(token).getBody();
    }

    //check if the token has expired
    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    /**
     * Generates the token with the id in the payload
     * called by {@link AuthenticationController#login(User)} <br>
     * Id retrieval by {@link #getUserIdFromHeader(String)} (String)} <br>
     * see {@link AuthenticationUserDetails} <br>
     * @param userDetails userDetails
     * @return the token
     */
    public String generateToken(AuthenticationUserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        // add the
        claims.put("id", userDetails.getId());
        claims.put("database_token", userDetails.getDatabaseToken());
        return doGenerateToken(claims, userDetails.getUsername());
    }

    //while creating the token -
    //1. Define  claims of the token, like Issuer, Expiration, Subject, and the ID
    //2. Sign the JWT using the HS512 algorithm and secret key.
    //3. According to JWS Compact Serialization(https://tools.ietf.org/html/draft-ietf-jose-json-web-signature-41#section-3.1)
    //   compaction of the JWT to a URL-safe string
    private String doGenerateToken(Map<String, Object> claims, String subject) {
        return Jwts.builder().setClaims(claims).setSubject(subject).setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                .signWith(SignatureAlgorithm.HS512, secret).compact();
    }

    //validate token
    public Boolean validateToken(String token, AuthenticationUserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername())
                && !isTokenExpired(token) && !userDetails.isCurrentTokenExpired()
                && userDetails.getDatabaseToken() == getDatabaseTokenFromToken(token));
    }
}