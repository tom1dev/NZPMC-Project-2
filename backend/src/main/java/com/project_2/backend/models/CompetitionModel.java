package com.project_2.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

@Document
public class CompetitionModel {
    @Id
    private String title;

    private Date date;

    private LocalTime startTime;
    private LocalTime duration;

    public String getStartTime() {
        return getStringFromTime(startTime);
    }

    public void setStartTime(String startTime) {
        this.startTime = getTimeFromString(startTime);
    }

    public String getDuration() {
        return getStringFromTime(duration);
    }

    public void setEndTime(String endTime) {
        this.duration = getTimeFromString(endTime);
    }

    public LocalTime getTimeFromString(String time){
        try{
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
            return LocalTime.parse(time, formatter);
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    public String getStringFromTime(LocalTime time){
          if(time == null){
              return null;
          }

          DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
          return time.format(formatter);
    }

    private String[] QuestionIds;

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String[] getQuestionIds() {
        return QuestionIds;
    }
    public void setQuestionIds(String[] questionIds) {
        QuestionIds = questionIds;
    }

    public String getDate() {
        if(date != null){
            SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
            return formatter.format(date);
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
