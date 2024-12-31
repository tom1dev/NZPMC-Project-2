package com.project_2.backend.services;


import com.project_2.backend.models.AttemptModel;
import com.project_2.backend.repositories.AttemptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AttemptService {
    @Autowired
    private AttemptRepository attemptRepository;


    public List<AttemptModel> getAllUserAttempts(String email) {
        return attemptRepository.findAllByStudentEmail(email);
    }

    public AttemptModel getUserAttempt(String email,String competitionTitle){
        return attemptRepository.findOneByStudentEmailAndCompetitionId(email,competitionTitle);
    }

    public void createNewAttempt(AttemptModel attempt){
        attemptRepository.save(attempt);
    }




}
