package com.project_2.backend.repositories;


import com.project_2.backend.models.UserModel;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepositoryMongo extends MongoRepository<UserModel, String> {
}
