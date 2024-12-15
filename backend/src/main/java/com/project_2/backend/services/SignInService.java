package com.project_2.backend.services;

import com.project_2.backend.models.UserModel;
import com.project_2.backend.repositories.EventRepository;
import io.github.cdimascio.dotenv.Dotenv;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;
import java.util.Date;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.interfaces.DecodedJWT;

@Service
public class SignInService {

    public String hashPassword(String password) {
        try{
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }



    public String generateToken(String email) {

        Algorithm algorithm = Algorithm.HMAC256(Dotenv.load().get("JWT_SECRET"));

        return JWT.create()
                .withClaim("email", email)
                .sign(algorithm);
    }

    public String  extractEmail(String token) {

        String key = token.substring(7).trim();

        Algorithm algorithm = Algorithm.HMAC256(Dotenv.load().get("JWT_SECRET"));
        return JWT.require(algorithm).build().verify(key).getClaim("email").asString();
    }

//    public boolean isTokenExpired(String token) {
//        return extractExpiration(token).before(new Date());
//    }

//    private Date extractExpiration(String token) {
//        return Jwts.parserBuilder()
//                .setSigningKey(Dotenv.load().get("JWT_SECRET"))
//                .build()
//                .parseClaimsJws(token)
//                .getBody()
//                .getExpiration();
//    }

    public boolean validateToken(String token, String email) {
        return (email.equals(extractEmail(token)));
    }


}
