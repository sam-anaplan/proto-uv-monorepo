from collections.abc import Generator

from app.model.task_model import TaskModel

class TaskService:
    taskList: list[TaskModel] = [
            TaskModel("id1", "do one thing", True),
            TaskModel("id2", "do another", False) ]

    def get_tasks(self):
        return self.taskList

    def get_task_by_id(self, id: str) -> TaskModel | None:
        for task in self.taskList:
            if task.id == id:
                return task
        return None

    def create_task(self, task: TaskModel):
        self.taskList.append(task)

    def update_task(self, task: TaskModel):
        for i in range(len(self.taskList)):
            if self.taskList[i].id == task.id:
                self.taskList[i] = task
                return

    def delete_task(self, id: str):
        self.taskList = [task for task in self.taskList if task.id != id]

    def cleanup(self):
        print(f"Cleaning up Task Service")

def get_task_service() -> Generator[TaskService, None, None]:
    service = TaskService()
    try: 
        yield service
    finally:
        service.cleanup()
