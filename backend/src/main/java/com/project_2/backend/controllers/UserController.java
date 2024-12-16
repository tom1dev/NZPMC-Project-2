package com.project_2.backend.controllers;

import com.project_2.backend.models.EventModel;
import com.project_2.backend.models.UserModel;
import com.project_2.backend.models.UsersEventsModel;
import com.project_2.backend.services.EventService;
import com.project_2.backend.services.SignInService;
import com.project_2.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.server.Cookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private SignInService signInService;

    @GetMapping("/")
    public ResponseEntity<List<UserModel>> getAllUsers() {
        List<UserModel> users  = userService.getAllUsers();

        if(users != null && !users.isEmpty()) {
            return ResponseEntity.ok(users);
        }else{
            return ResponseEntity.status(404).body(null);
        }

    }

    @GetMapping("/mydetails")
    public ResponseEntity<List<UserModel>> getUserDetails(@RequestHeader String authorization) {
        try{
            String email = signInService.extractEmail(authorization);
            UserModel user = userService.getUserByEmail(email);
            List<UserModel> users = new ArrayList<>();
            users.add(user);


            if(user != null) {
                return ResponseEntity.ok(users);
            }else{
                return ResponseEntity.status(404).body(null);
            }
        } catch (Exception e) {
            return ResponseEntity.status(404).body(null);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserModel> getUserById(@PathVariable String id) {
        UserModel user =  userService.getUserById(id);
        if(user != null) {
            return ResponseEntity.ok(user);
        }else{
            return ResponseEntity.status(404).body(null);
        }

    }

    @GetMapping("/{id}/events")
    public ResponseEntity<List<UsersEventsModel>> getUserEvents(@PathVariable String id) {
        List<UsersEventsModel> usersEvents =  userService.getAllUserEventIds(id);

        if(usersEvents != null && !usersEvents.isEmpty()) {
            return ResponseEntity.ok(usersEvents);
        }else{
            return ResponseEntity.status(404).body(null);
        }
    }

    @PostMapping("")
    public ResponseEntity<String> CreateUser(@RequestBody UserModel user) {


        if(userService.getUserByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(409).body(user.getEmail());
        };

        String token = userService.createUser(user);

        if(token != null) {
            return ResponseEntity.status(201).body(token);
        }else{
            return ResponseEntity.status(400).body(null);
        }
    }

    @PostMapping("/{id}/events")
    public ResponseEntity<String> CreateUserEvent(@PathVariable String id, @RequestBody Map<String, String> eventId) {
        boolean hasAdded = userService.createUserEvent(id,eventId.get("eventId"));
        if(hasAdded){
            return ResponseEntity.status(201).body(eventId.get("eventId"));
        }else{
            return ResponseEntity.status(400).body(null);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<String> UpdateUser(@PathVariable String id, @RequestBody Map<String, Object> payload) {
        UserModel userCreated = userService.getUserById(id);
        userCreated.setName(payload.get("name").toString());

        userCreated =  userService.updateUser(userCreated);



        if(userCreated != null) {
            return ResponseEntity.status(201).body(userCreated.toString());
        }else{
            return ResponseEntity.status(400).body(null);
        }
    }










}
