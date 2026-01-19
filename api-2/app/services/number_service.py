from collections.abc import Generator
from numpy import random

class NumberService:
    def get_random_number(self, low: int = 0, high: int = 100) -> int:
        return random.randint(low, high)

    def cleanup(self):
        print(f"Cleaning up Task Service")

def get_number_service() -> Generator[NumberService, None, None]:
    service = NumberService()
    try: 
        yield service
    finally:
        service.cleanup()
