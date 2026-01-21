from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from app.dto.task_dto import TaskDto
from app.model.task_model import TaskModel
from app.services.task_service import TaskService, get_task_service

from welcome.hello import get_hello

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:10666",
    "http://localhost:8000",
    "http://localhost:80",
    "http://localhost:4200",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return get_hello()

@app.get("/tasks")
def get_tasks(service: TaskService = Depends(get_task_service)):
    # iterate over the tasks and call to_dto on each:
    tasks = service.get_tasks()
    return [task.to_dto() for task in tasks]

@app.get("/task/{id}")
def get_task(
        id: str,
       service: TaskService = Depends(get_task_service)) :
    result = service.get_task_by_id(id)
    if result is None:
        return {"error": "task not found"}

    return result.to_dto().__dict__

@app.put("/task/")
def update_task(
        taskDto: TaskDto,
        service: TaskService = Depends(get_task_service)) :
    if taskDto.id is None:
        return {"error": "task id is required for update"}
    updatedTask = TaskModel(id=taskDto.id, description=taskDto.description, done=taskDto.done)
    service.update_task(updatedTask)

@app.post("/task/")
def create_task(
        taskDto: TaskDto,
        service: TaskService = Depends(get_task_service)) :
    if taskDto.id is None:
        import uuid
        taskDto.id = str(uuid.uuid4())
    newTask = TaskModel(id=taskDto.id, description=taskDto.description, done=taskDto.done)
    service.create_task(newTask)
    return {"status": "task created"}

@app.delete("/task/{id}")
def delete_task(
        id: str,
        service: TaskService = Depends(get_task_service)) :
    service.delete_task(id)
    return {"status": "task deleted"}
