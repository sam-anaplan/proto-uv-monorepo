from fastapi import FastAPI, Depends
from fastapi.middleware.cors import CORSMiddleware

from app.services.number_service import NumberService, get_number_service

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

@app.get("/number/random/{max}")
def get_random(
       max: str,
       service: NumberService = Depends(get_number_service)) :
    max_int = int(max)
    random_number = service.get_random_number(0, max_int)
    return {"random_number": random_number}

