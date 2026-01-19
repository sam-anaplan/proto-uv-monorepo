from pydantic import BaseModel

class TaskDto(BaseModel):
    description: str
    done: bool = False
    id: str | None = None
