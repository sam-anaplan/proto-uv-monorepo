package com.example.demo.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.example.demo.dto.TaskDto;
import com.example.demo.model.Task;
import com.example.demo.exceptions.*;

@Service
public class TaskService {

    public List<Task> taskList = new ArrayList<Task>();

    public TaskDto getTask(String id) {
        return taskList.stream()
                .filter(task -> task.getId().equals(id))
                .findFirst()
                .map(task -> task.toDto())
                .orElseThrow(() -> new TaskNotFoundException(id));
    }

    public List<TaskDto> getTasks() {
        return taskList.stream()
                .map(task -> task.toDto())
                .toList();
    }

    public TaskDto addTask(TaskDto taskDto) {
        Task newTask = new Task(taskDto.description(), taskDto.done());
        taskList.add(newTask);
        return newTask.toDto();
    }

    public TaskDto updateTask(TaskDto taskDto) {
        Task newTask = new Task(taskDto.id(), taskDto.description(), taskDto.done());
        taskList.removeIf(t -> t.getId().equals(taskDto.id()));
        taskList.add(newTask);
        return newTask.toDto();
    }

    public void deleteTask(String id) {
        taskList.removeIf(t -> t.getId().equals(id));
    }
}
