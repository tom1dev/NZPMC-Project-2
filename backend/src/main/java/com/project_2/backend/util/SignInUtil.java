package com.project_2.backend.util;

import io.github.cdimascio.dotenv.Dotenv;

import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;

@Service
public class SignInUtil {

    public String hashPassword(String password) {
        try{
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }


    //generates a jwt token used for signin
    public String generateToken(String email) {

        Algorithm algorithm = Algorithm.HMAC256(Dotenv.load().get("JWT_SECRET"));

        return JWT.create()
                .withClaim("email", email)
                .sign(algorithm);
    }

    //gets the users email which is hidden in the token
    public String  extractEmail(String token) {

        String key = token.substring(7).trim();

        Algorithm algorithm = Algorithm.HMAC256(Dotenv.load().get("JWT_SECRET"));
        try {
            return JWT.require(algorithm).build().verify(key).getClaim("email").asString();
        }catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    //compares a token and email address
    public boolean validateToken(String token, String email) {
        return (email.equals(extractEmail(token)));
    }


}
