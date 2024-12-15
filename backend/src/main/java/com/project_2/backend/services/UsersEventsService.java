package com.project_2.backend.services;

import com.project_2.backend.models.UsersEventsModel;
import com.project_2.backend.repositories.UsersEventsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class UsersEventsService {
    @Autowired
    private UsersEventsRepository usersEventsRepository;

    public List<String> getUserEventIDs(String ID){
        List<UsersEventsModel> usersEventsModels = usersEventsRepository.findAllByUserId(ID);

        //adds all event ids for a user to a list
        List<String> usersEventIDs = new ArrayList<>();

        for(UsersEventsModel usersEventsModel : usersEventsModels){
            usersEventIDs.add(usersEventsModel.getEventId());
        }
        return usersEventIDs;

    }

    public List<String> getEventRegisteredIDs(String ID){
        List<UsersEventsModel> usersEventsModels = usersEventsRepository.findAllByEventId(ID);

        //adds all the user ids that have joined the event into a list
        List<String> eventUserIDs = new ArrayList<>();

        for(UsersEventsModel usersEventsModel : usersEventsModels) {
            eventUserIDs.add(usersEventsModel.getUserId());
        }

        return eventUserIDs;

    }

    public Boolean addUserEvent(String userID, String eventID){
        UsersEventsModel usersEventsModel = new UsersEventsModel();
        usersEventsModel.setUserId(userID);
        usersEventsModel.setEventId(eventID);
        usersEventsRepository.save(usersEventsModel);
        return true;


    }





}
