package com.project_2.backend.services;


import com.project_2.backend.models.EventModel;
import com.project_2.backend.models.UserModel;
import com.project_2.backend.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.ArrayList;
import java.util.List;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UserService userService;

    public List<EventModel> getAllEvents(){
        List<EventModel> events = eventRepository.findAll();
        return events;
    }


    public EventModel getEventById(String id){
        return eventRepository.findById(id).orElse(null);
    }

    public EventModel createEvent(EventModel event){
        return eventRepository.save(event);
    }

    public String getUserAmountByEventId(String eventID){

        List<UserModel> users = userService.getAllUsers();

        int count = 0;

        for(UserModel user : users){
            if(user.getJoinedEvents().contains(eventID)){
                count++;
            }
        }

        return Integer.toString(count);

    }


}
