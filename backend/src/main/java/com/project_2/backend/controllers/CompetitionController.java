package com.project_2.backend.controllers;


import com.project_2.backend.models.CompetitionModel;
import com.project_2.backend.models.QuestionModel;
import com.project_2.backend.services.CompetitionService;
import com.project_2.backend.util.SignInUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Optional;

import com.project_2.backend.util.SignInUtil;

@RestController
@RequestMapping("/api/competition")
@CrossOrigin("*")
public class CompetitionController {
    @Autowired
    private CompetitionService competitionService;

    @Autowired
    private SignInUtil signInUtil;

    @GetMapping("")
    public ResponseEntity<List<CompetitionModel>> getAllCompetitions (@RequestHeader Optional<String> authorization){
        String email = null;

        if(authorization.isPresent()){
            email = signInUtil.extractEmail(authorization.get());
        }

        List<CompetitionModel> competitions;
        if(email != null && email.equals("admin")){
            competitions = competitionService.getAllCompetitions();
        }else{
            competitions = competitionService.getAllCompetitionsWithEvent();
        }



        if(competitions.isEmpty()){
            return ResponseEntity.status(404).build();
        }

        return ResponseEntity.ok(competitions);
    }

    @GetMapping("/{title}")
    public ResponseEntity<CompetitionModel> getCompetitionByTitle(@PathVariable String title){

        CompetitionModel competition = competitionService.getCompetitionByTitle(title);
        if(competition == null){
            return ResponseEntity.status(404).build();
        }
        return ResponseEntity.ok(competition);



    }

    @PostMapping("")
    public ResponseEntity<String> addCompetition(@RequestBody CompetitionModel competition){
        try{
            competitionService.createCompetition(competition);
            return ResponseEntity.status(201).build();
        }catch(Exception e){
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/{competition}/events")
    public ResponseEntity<CompetitionModel> addCompetitionToEvent(@PathVariable String competition, @RequestBody String eventName){
        try{
            String eventClean =  URLDecoder.decode(eventName, StandardCharsets.UTF_8).substring(0, eventName.length()-1);
            competitionService.addEventToCompetition(competition, eventClean);
            return ResponseEntity.status(201).build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/{competition}/questions")
    public ResponseEntity<CompetitionModel> addQuestionToCompetition(@PathVariable String competition, @RequestBody QuestionModel question){
        try{
            Boolean isCreated = competitionService.addQuestionToCompetition(competition, question);
            if(!isCreated){
                return ResponseEntity.status(500).build();
            }
            return ResponseEntity.status(201).build();
        }catch(Exception e){
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{competition}/questions")
    public ResponseEntity<List<QuestionModel>> getQuestionsByCompetition(@PathVariable String competition){
        List<QuestionModel> questions = competitionService.getQuestions(competition);
        if(questions.isEmpty()){
            return ResponseEntity.status(404).build();
        }else{
            return ResponseEntity.ok(questions);
        }
    }

}
