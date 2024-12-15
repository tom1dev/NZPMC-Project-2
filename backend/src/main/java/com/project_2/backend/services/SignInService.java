package com.project_2.backend.services;

import com.project_2.backend.models.UserModel;
import com.project_2.backend.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;

import static java.awt.SystemColor.text;

@Service
public class SignInService {

    private String hashPassword(String password) {
        try{
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            return Base64.getEncoder().encodeToString(hash);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }

    }

    public boolean signIn(String email, String password) {
        try{
            String passwordHash = hashPassword(password);

            UserService userService = new UserService();
            UserModel user  = userService.getUserByEmail(email);

            if(user!= null && user.getPasswordHash().equals(passwordHash)) {
                return true;
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return false;
    }





}
