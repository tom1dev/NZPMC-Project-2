package com.project_2.backend.services;

import com.project_2.backend.models.CompetitionModel;
import com.project_2.backend.models.QuestionModel;
import com.project_2.backend.repositories.CompetitionRepository;
import com.project_2.backend.repositories.EventRepository;
import com.project_2.backend.repositories.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CompetitionService {
    @Autowired
    private CompetitionRepository competitionRepository;

    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private QuestionRepository questionRepository;

    public List<CompetitionModel> getAllCompetitions() {
        return null;
    }

    public CompetitionModel getCompetitionByTitle(String Title) {
        return null;
    }

    public CompetitionModel createCompetition(){
        return null;
    }

    public Boolean addEventToCompetition(String competitionName, String eventName) {
        return null;
    }

    public Boolean addQuestionToCompetition(String competitionName, QuestionModel question) {
        return null;
    }





}
