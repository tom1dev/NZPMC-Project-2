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

    public List<EventModel> getAllEvents(){
        return eventRepository.findAll();
    }



}
