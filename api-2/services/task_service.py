from collections.abc import Generator

from dto.task_dto import TaskDto

class TaskService:
    taskList: list[TaskDto] = [
            TaskDto("id1", "do one thing"),
            TaskDto("id1", "do another")
            ]

    def get_tasks(self):
        return self.taskList

    def cleanup(self):
        print(f"Cleaning up Task Service")

def get_task_service() -> Generator[TaskService, None, None]:
    service = TaskService()
    try: 
        yield service
    finally:
        service.cleanup()
