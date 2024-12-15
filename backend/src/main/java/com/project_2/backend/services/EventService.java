package com.project_2.backend.services;


import com.project_2.backend.models.EventModel;
import com.project_2.backend.repositories.EventRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;

@Service
public class EventService {
    @Autowired
    private EventRepository eventRepository;

    @Autowired
    private UsersEventsService usersEventsService;

    public List<EventModel> getAllEvents(){
        return eventRepository.findAll();
    }


    public EventModel getEventById(String id){
        return eventRepository.findById(id).orElse(null);
    }

    public EventModel createEvent(EventModel event){
        return eventRepository.save(event);
    }

    public String getUserAmountByEventId(String eventID){

        List<String> userIDs = usersEventsService.getEventRegisteredIDs(eventID);

        return String.valueOf(userIDs.size());

    }


}
