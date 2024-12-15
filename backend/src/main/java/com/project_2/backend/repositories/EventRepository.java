package com.project_2.backend.repositories;

import com.project_2.backend.models.EventModel;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<EventModel, Long> {

}
