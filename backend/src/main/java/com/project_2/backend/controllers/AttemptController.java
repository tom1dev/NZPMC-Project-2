package com.project_2.backend.controllers;


import com.project_2.backend.models.AttemptModel;
import com.project_2.backend.models.CompetitionModel;
import com.project_2.backend.services.AttemptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/attempt")
@CrossOrigin("*")
public class AttemptController {
    @Autowired
    private AttemptService attemptService;

    @GetMapping("/{email}")
    public ResponseEntity<List<AttemptModel>> getAttempts(@PathVariable String email) {
        try{
            List<AttemptModel> attempts = attemptService.getAllUserAttempts(email);
            if(attempts == null || attempts.isEmpty()){
                return ResponseEntity.status(404).build();
            }
            return ResponseEntity.ok(attempts);
        }catch(Exception e){
            return ResponseEntity.status(500).body(null);
        }
    }

    @GetMapping("/{email}/{competitionTitle}")
    public ResponseEntity<AttemptModel> getAttempt(@PathVariable String email,@PathVariable String competitionTitle) {
        try{
            AttemptModel attempt = attemptService.getUserAttempt(email,competitionTitle);
            if(attempt == null){
                return ResponseEntity.status(404).body(null);
            }
            return ResponseEntity.ok(attempt);
        }catch(Exception e){
            return ResponseEntity.status(500).body(null);
        }


    }

    @PostMapping("")
    public ResponseEntity<AttemptModel> addAttempt(@RequestBody AttemptModel attempt) {
        try{
            attemptService.createNewAttempt(attempt);
            return ResponseEntity.ok().body(null);
        }catch(Exception e){
            return ResponseEntity.status(500).body(null);
        }
    }








}
