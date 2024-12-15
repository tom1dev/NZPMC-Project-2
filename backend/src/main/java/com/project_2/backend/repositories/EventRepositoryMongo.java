package com.project_2.backend.repositories;

import com.project_2.backend.models.EventModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EventRepositoryMongo extends MongoRepository <EventModel, String> {
    List<EventModel> findByName(String name);
}
