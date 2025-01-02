package com.project_2.backend.services;

import com.project_2.backend.models.CompetitionModel;
import com.project_2.backend.models.EventModel;
import com.project_2.backend.models.QuestionModel;
import com.project_2.backend.repositories.CompetitionRepository;
import com.project_2.backend.repositories.EventRepository;
import com.project_2.backend.repositories.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CompetitionService {
    @Autowired
    private CompetitionRepository competitionRepository;

    @Autowired
    private EventService eventService;

    @Autowired
    private QuestionRepository questionRepository;

    public List<CompetitionModel> getAllCompetitions() {


        return competitionRepository.findAll();
    }

    public List<CompetitionModel> getAllCompetitionsWithEvent() {
        List<EventModel> events = eventService.getAllEventsWithACompetition();
        List<CompetitionModel> competitions = new ArrayList<CompetitionModel>();
        HashSet<String> competitionIds = new HashSet<String>();

        for(EventModel event : events) {
            CompetitionModel competition = getCompetitionByTitle(event.getCompetitionTitle());

            if(competition != null && !competitionIds.contains(competition.getTitle())) {
                competitions.add(competition);
                competitionIds.add(competition.getTitle());
            }
        }


        return competitions;
    }

    public CompetitionModel getCompetitionByTitle(String title) {
        return competitionRepository.findById(title).orElse(null);
    }

    public CompetitionModel createCompetition(CompetitionModel competitionModel){
        return competitionRepository.save(competitionModel);
    }

    public Boolean addEventToCompetition(String competitionName, String eventName) {
        CompetitionModel competition = getCompetitionByTitle(competitionName);
        EventModel event =  eventService.getEventById(eventName);

        if (event == null || competition == null) {
            return false;
        }

        //sets the competition in the event
        event.setCompetitionTitle(competitionName);
        eventService.createEvent(event);

        return true;

    }

    public Boolean addQuestionToCompetition(String competitionName, QuestionModel question) {

        //saving question if it already exists do not save

        QuestionModel currentQuestion = questionRepository.findById(question.getTitle()).orElse(null);
        if (currentQuestion != null) {
            return false;
        }

        questionRepository.save(question);

        //adding question to competition
        CompetitionModel competition = getCompetitionByTitle(competitionName);

        int length = 1;
        String[] currentQuestions;
        if(competition.getQuestionIds() != null) {
            length += competition.getQuestionIds().length;
            currentQuestions  = Arrays.copyOf(competition.getQuestionIds(), length);
            currentQuestions[currentQuestions.length-1] = question.getTitle();
        }else{
            currentQuestions = new String[1];
            currentQuestions[0] = question.getTitle();
        }

        competition.setQuestionIds(currentQuestions);
        competitionRepository.save(competition);


        return true;
    }

    public List<QuestionModel> getQuestions(String competitionName) {
        CompetitionModel competition = getCompetitionByTitle(competitionName);
        if (competition == null || competition.getQuestionIds() == null||competition.getQuestionIds().length == 0) {
            return Collections.emptyList();
        }

        List<QuestionModel> questions = new ArrayList<>();

        for(String questionName: competition.getQuestionIds()) {
            QuestionModel question = questionRepository.findById(questionName).orElse(null);
            if (question != null) {
                questions.add(question);
            }
        }


        return questions;
    }





}
