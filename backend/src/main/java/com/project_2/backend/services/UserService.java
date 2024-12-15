package com.project_2.backend.services;

import com.project_2.backend.models.UserModel;
import com.project_2.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    UsersEventsService usersEventsService;

    public UserModel createUser(UserModel user) {
        return userRepository.save(user);
    }

    public List<UserModel> getAllUsers() {
        return userRepository.findAll();
    }

    public UserModel getUserById(String id) {
        return userRepository.findById(id).orElse(null);
    }

    public UserModel getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<String> getAllUserEventIds(String id){

        return usersEventsService.getUserEventIDs(id);
    }

    public Boolean createUserEvent(String userId, String eventId){

        if (usersEventsService.addUserEvent(userId, eventId)){
            return true;
        }else{
            return false;
        }

    }



    public UserModel updateUser(UserModel user) {
        return userRepository.save(user);

    }

}
