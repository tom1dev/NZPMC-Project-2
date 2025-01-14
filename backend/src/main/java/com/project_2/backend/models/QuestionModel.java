package com.project_2.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.List;


@Document
public class QuestionModel {
    public enum Difficulty {
        Easy, Medium, Hard
    }

    public enum Topic {
        Mechanics, Waves, Algebra, Geometry
    }

    @Id
    private String title;

    List<String> options = new ArrayList<>();

    private int correctChoiceIndex;

    private Difficulty difficulty;

    private Topic topic;

    public Difficulty getDifficulty() {
        return difficulty;
    }

    public void setDifficulty(String difficulty) {
        this.difficulty = Difficulty.valueOf(difficulty);;
    }

    public Topic getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = Topic.valueOf(topic);
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public int getCorrectChoiceIndex() {
        return correctChoiceIndex;
    }

    public void setCorrectChoiceIndex(int correctChoiceIndex) {
        this.correctChoiceIndex = correctChoiceIndex;
    }
}
