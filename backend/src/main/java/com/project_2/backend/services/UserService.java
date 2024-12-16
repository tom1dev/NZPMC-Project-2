package com.project_2.backend.services;

import com.project_2.backend.models.UserModel;
import com.project_2.backend.models.UsersEventsModel;
import com.project_2.backend.repositories.UserRepository;
import com.project_2.backend.util.SignInUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    UsersEventsService usersEventsService;

    @Autowired
    SignInUtil signInUtil;

    public String createUser(UserModel user) {
        user.setPasswordHash(signInUtil.hashPassword(user.getPasswordHash()));
        userRepository.save(user);

        return signInUtil.generateToken(user.getEmail());
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

    public List<UsersEventsModel> getAllUserEventIds(String id){

        return usersEventsService.getUserEventIDs(id);
    }

    public Boolean createUserEvent(String userId, String eventId){

        if (usersEventsService.addUserEvent(userId, eventId)){
            return true;
        }else{
            return false;
        }

    }

    public String signIn(String email, String password) {
        try{
            String passwordHash = signInUtil.hashPassword(password);

            UserModel user  = getUserByEmail(email);

            if(user!= null && user.getPasswordHash().equals(passwordHash)) {
                return signInUtil.generateToken(email);
            }

        } catch (Exception e) {
            throw new RuntimeException(e);
        }

        return null;
    }


    public UserModel updateUser(UserModel user) {
        return userRepository.save(user);

    }

}
