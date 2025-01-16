package com.project_2.backend.repositories;

import com.project_2.backend.models.QuestionModel;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface QuestionRepository extends MongoRepository<QuestionModel, String> {

    List<QuestionModel> findByTitleNotIn(List<String> names);
}
