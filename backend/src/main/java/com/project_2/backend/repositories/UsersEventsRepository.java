package com.project_2.backend.repositories;

import com.project_2.backend.models.UsersEventsModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsersEventsRepository extends MongoRepository<UsersEventsModel, String> {
    List<UsersEventsModel> findAllByUserId(String userId);

    List<UsersEventsModel> findAllByEventId(String EventId);
}
