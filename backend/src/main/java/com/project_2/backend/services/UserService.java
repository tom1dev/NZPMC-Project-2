package com.project_2.backend.services;

import com.project_2.backend.models.UserModel;
import com.project_2.backend.repositories.EventRepository;
import com.project_2.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository UserRepository;

    public UserModel createUser(UserModel user) {
        return UserRepository.save(user);
    }

    public List<UserModel> getAllUsers() {
        return UserRepository.findAll();
    }

    public UserModel getUserById(String id) {
        return UserRepository.findById(id).orElse(null);
    }

    public UserModel getUserByEmail(String email) {
        return UserRepository.findByEmail(email);
    }

    public List<String> getAllUserEventIds(String id){
        UsersEventsService usersEventsService = new UsersEventsService();

        return usersEventsService.getUserEventIDs(id);
    }

    public UserModel updateUser(UserModel user) {
        return UserRepository.save(user);

    }

}
