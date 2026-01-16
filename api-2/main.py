from typing import Annotated
from fastapi import FastAPI, Depends, Header
from dto.task_dto import TaskDto
from services.task_service import TaskService, get_task_service

app = FastAPI()

def placeholder():
    return TaskDto(id="a",description="basbsd",done=False)

@app.get("/tasks")
def get_tasks(service: Annotated[TaskService, get_task_service]) :
    return service.get_tasks()

@app.get("/task/{id}")
def get_task(id: str) :
    return placeholder()

@app.put("/task/{id}")
def update_task(id: str) :
    return placeholder()

@app.post("/task/{id}")
def create_task(id: str) :
    return placeholder()

@app.delete("/task/{id}")
def delete_task(id: str) :
    return placeholder()
