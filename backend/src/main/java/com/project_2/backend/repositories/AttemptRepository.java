package com.project_2.backend.repositories;

import com.project_2.backend.models.AttemptModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AttemptRepository extends MongoRepository<AttemptModel, String> {
    List<AttemptModel> findAllByStudentEmail(String username);
    List<AttemptModel> findAllByCompetitionId(String competitionId);
    List<AttemptModel> findAllByStudentEmailAndCompetitionId(String StudentEmail, String CompetitionId);
}
