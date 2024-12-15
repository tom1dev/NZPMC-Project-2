package com.project_2.backend.controllers;


import com.project_2.backend.models.EventModel;
import com.project_2.backend.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/event")
public class EventController {
    @Autowired
    private EventService eventService;

    @GetMapping
    public List<EventModel> getAllEvents() {
        return eventService.getAllEvents();
    }

}
