package com.project_2.backend.controllers;


import com.project_2.backend.models.CompetitionModel;
import com.project_2.backend.models.QuestionModel;
import com.project_2.backend.services.CompetitionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/competition")
@CrossOrigin("*")
public class CompetitionController {
    @Autowired
    private CompetitionService competitionService;

    @GetMapping("")
    public ResponseEntity<List<CompetitionModel>> getAllCompetitions (){

        List<CompetitionModel> competitions = competitionService.getAllCompetitions();

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
            competitionService.addEventToCompetition(competition, eventName);
            return ResponseEntity.status(201).build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }

    @PostMapping("/{competition}/question")
    public ResponseEntity<CompetitionModel> addQuestionToCompetition(@PathVariable String competition, @RequestBody QuestionModel question){
        try{
            competitionService.addQuestionToCompetition(competition, question);
            return ResponseEntity.status(201).build();
        }catch(Exception e){
            return ResponseEntity.status(500).build();
        }
    }

}
