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

        return null;

    }

    @GetMapping("/{title}")
    public ResponseEntity<CompetitionModel> getCompetitionByTitle(@PathVariable String title){
        return null;
    }

    @PostMapping("")
    public ResponseEntity<CompetitionModel> addCompetition(@RequestBody CompetitionModel competition){
        return null;
    }

    @PostMapping("/{competition}/events")
    public ResponseEntity<CompetitionModel> addCompetitionToEvent(@PathVariable String competition, @RequestBody String eventName){
        return null;
    }

    @PostMapping("/{competition}/question")
    public ResponseEntity<CompetitionModel> addQuestionToCompetition(@PathVariable String competition, @RequestBody QuestionModel question){
        return null;
    }










}
