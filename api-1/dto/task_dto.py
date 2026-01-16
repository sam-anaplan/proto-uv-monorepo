from dataclasses import dataclass

@dataclass
class TaskDto:
    id: str
    description: str
    done: bool = False
