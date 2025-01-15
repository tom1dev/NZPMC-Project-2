package com.project_2.backend.services;


import com.project_2.backend.models.AttemptModel;
import com.project_2.backend.models.CompetitionModel;
import com.project_2.backend.repositories.AttemptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Service
public class AttemptService {
    @Autowired
    private AttemptRepository attemptRepository;

    @Autowired
    private CompetitionService competitionService;


    public List<AttemptModel> getAllUserAttempts(String email) {
        return attemptRepository.findAllByStudentEmail(email);
    }
    public List<AttemptModel> findAllByCompetitionId(String competitionId) {
        return attemptRepository.findAllByCompetitionId(competitionId);
    }

    public AttemptModel getUserAttempt(String email,String competitionTitle){
        List<AttemptModel> attempts = attemptRepository.findAllByStudentEmailAndCompetitionId(email,competitionTitle);
        if(attempts == null || attempts.isEmpty()){
            return null;
        }else{
            return attempts.getFirst();
        }

    }

    public void createNewAttempt(AttemptModel attempt) throws Exception {

        LocalDateTime now = LocalDateTime.now();

        CompetitionModel competitionModel = competitionService.getCompetitionByTitle(attempt.getCompetitionId());

        String date = competitionModel.getDate();
        String startTime = competitionModel.getStartTime();


        LocalDateTime competitionStart = LocalDateTime.parse(date +" "+ startTime, DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm"));

        int[] duration = Arrays.stream(competitionModel.getDuration().split(":")).mapToInt(Integer::parseInt).toArray();
        LocalDateTime competitionEnd = LocalDateTime.parse(date +" "+ startTime, DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")).plusHours(duration[0]).plusMinutes(duration[1]).plusMinutes(1);


        //if the attempt was submitted in the competition timeframe save it.
        if(now.isBefore(competitionEnd) && now.isAfter(competitionStart)){
            attemptRepository.save(attempt);
        }else{
            throw new Exception();
        }

    }




}
