package com.project_2.backend.controllers;


import com.project_2.backend.models.EventModel;
import com.project_2.backend.services.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;

@RestController
@RequestMapping("/api/event")
@CrossOrigin("*")
public class EventController {
    @Autowired
    private EventService eventService;

    @GetMapping
    public ResponseEntity<List<EventModel>> getAllEvents() {
        List<EventModel> events =  eventService.getAllEvents();
        if(events != null){
            return ResponseEntity.ok(events);

        }else{
            return ResponseEntity.status(404).body(null);
        }

    }


    @GetMapping("/{id}")
    public ResponseEntity<EventModel> getEventById(@PathVariable int id) {
        EventModel event = eventService.getEventById(String.valueOf(id));
        if(event != null){
            return ResponseEntity.ok(event);
        }else{
            return ResponseEntity.status(404).body(null);
        }
    }

    @GetMapping("/{id}/userAmount")
    public ResponseEntity<String> getUserAmount(@PathVariable String id) {
        try{
            String amount = eventService.getUserAmountByEventId(id);
            if(amount != null){
                return ResponseEntity.ok(amount);
            }else{
                return ResponseEntity.status(404).body(null);
            }
        }catch (Exception e){
            return ResponseEntity.status(500).body(null);
        }
    }

    @PostMapping("")
    public ResponseEntity<String> CreateEvent(@RequestBody EventModel event) {
        try{
            eventService.createEvent(event);
            return ResponseEntity.status(201).body(null);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null);
        }
    }




}
