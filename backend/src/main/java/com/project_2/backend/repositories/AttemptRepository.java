package com.project_2.backend.repositories;

import com.project_2.backend.models.AttemptModel;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AttemptRepository extends MongoRepository<AttemptModel, String> {
}
