package com.project_2.backend.controllers;

import com.project_2.backend.models.EventModel;
import com.project_2.backend.models.UserModel;
import com.project_2.backend.services.EventService;
import com.project_2.backend.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/user")
@CrossOrigin("*")
public class UserController {
    @Autowired
    private UserService userService;


    @GetMapping("")
    public ResponseEntity<List<UserModel>> getAllUsers() {
        List<UserModel> users  = userService.getAllUsers();

        if(users != null && !users.isEmpty()) {
            return ResponseEntity.ok(users);
        }else{
            return ResponseEntity.status(404).body(null);
        }

    }

    @GetMapping("/mydetails")
    public String getUserDetails() {
        return null;
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
    public ResponseEntity<List<String>> getUserEvents(@PathVariable String id) {
        List<String> eventIds =  userService.getAllUserEventIds(id);

        if(eventIds != null && !eventIds.isEmpty()) {
            return ResponseEntity.ok(eventIds);
        }else{
            return ResponseEntity.status(404).body(null);
        }
    }

    @PostMapping("")
    public ResponseEntity<String> CreateUser(@RequestBody UserModel user) {
        UserModel userCreated = userService.createUser(user);

        if(userCreated != null) {
            return ResponseEntity.status(201).body(userCreated.toString());
        }else{
            return ResponseEntity.status(400).body(null);
        }
    }

    @PostMapping("/{id}/events")
    public ResponseEntity<String> CreateUserEvent(@PathVariable String id, @RequestBody String eventId) {
        boolean hasAdded = userService.createUserEvent(id,eventId);
        if(hasAdded){
            return ResponseEntity.status(201).body(eventId);
        }else{
            return ResponseEntity.status(400).body(null);
        }
    }

    @PatchMapping("/{id}")
    public ResponseEntity<String> UpdateUser(@PathVariable int id, @RequestBody UserModel user) {
        UserModel userCreated = userService.updateUser(user);

        if(userCreated != null) {
            return ResponseEntity.status(201).body(userCreated.toString());
        }else{
            return ResponseEntity.status(400).body(null);
        }
    }










}
