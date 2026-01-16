package com.example.demo.model;

import java.util.UUID;

import com.example.demo.dto.TaskDto;

public class Task {
    String id;
    String description;
    boolean done;

    public Task(String id, String description, boolean done) {
        this.id = id;
        this.description = description;
        this.done = done;
    }

    public Task(String description, boolean done) {
        this(UUID.randomUUID().toString(), description, done);
    }

    public Task(String description) {
        this(description, false);
    }

    public String getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean getDone() {
        return done;
    }

    public void setDone(boolean done) {
        this.done = done;
    }

    public TaskDto toDto() {
        return new TaskDto(id, description, done);
    }
}
