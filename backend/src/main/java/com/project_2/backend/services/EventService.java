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

    private UserService userService;

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
        UsersEventsService userEventsService = new UsersEventsService();
        List<String> userIDs = userEventsService.getEventRegisteredIDs(eventID);

        return Integer.toHexString(userIDs.size());

    }


}
