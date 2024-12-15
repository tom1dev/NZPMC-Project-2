package com.project_2.backend.repositories;

import com.project_2.backend.models.UsersEventsModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UsersEventsRepositoryMongo extends MongoRepository<UsersEventsModel, String> {

}
