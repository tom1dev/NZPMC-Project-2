package com.project_2.backend.controllers;

import com.project_2.backend.models.EventModel;
import com.project_2.backend.services.EventService;
import com.project_2.backend.services.SignInService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/signinus")
public class SignInController {
    @Autowired
    private SignInService SignInService;

    @PostMapping
    public  ResponseEntity<String> signIn(@RequestBody Map<String, Object> payload) {
        try{
            String password = (String) payload.get("passwordHash");
            String email = (String) payload.get("email");
            if(SignInService.signIn(email,password)){
                return new ResponseEntity<>("hihi", HttpStatus.OK);
            }else{
                return new ResponseEntity<>("SignInFailed", HttpStatus.UNAUTHORIZED);
            }
        }catch (Exception e){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        }
    }



}
