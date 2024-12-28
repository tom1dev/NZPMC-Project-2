package com.project_2.backend.repositories;

import com.project_2.backend.models.QuestionModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface QuestionRepository extends MongoRepository<QuestionModel, String> {
}
