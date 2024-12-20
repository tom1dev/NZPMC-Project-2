package com.project_2.backend.models;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.ArrayList;
import java.util.Collection;

@Document
public class CompetitionModel {
    @Id
    private String title;

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
}
