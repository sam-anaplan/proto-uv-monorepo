from dataclasses import dataclass

from app.dto.task_dto import TaskDto

@dataclass
class TaskModel:
    id: str
    description: str
    done: bool = False

    def to_dto(self) -> TaskDto:
        return TaskDto(id=self.id, description=self.description, done=self.done)
