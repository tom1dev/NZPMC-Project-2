package com.project_2.backend.models;


import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

@Document
public class EventModel {
    @Id
    private String name;
    private String description;
    private Date date;
    private String CompetitionTitle;

    public String getCompetitionTitle() {
        return CompetitionTitle;
    }

    public void setCompetitionTitle(String competitionTitle) {
        CompetitionTitle = competitionTitle;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDate() {
        if(date != null){
            SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
            String formattedDate = formatter.format(date);
            return formattedDate;
        } else{
            return null;
        }

    }

    public void setDate(String date) {
        try{
            SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy");
            this.date = formatter.parse(date);
        }catch (Exception e){
            e.printStackTrace();
        }

    }
}
