package com.project_2.backend.repositories;

import com.project_2.backend.models.CompetitionModel;
import org.springframework.data.mongodb.repository.MongoRepository;


public interface CompetitionRepository extends MongoRepository<CompetitionModel, String> {
}
