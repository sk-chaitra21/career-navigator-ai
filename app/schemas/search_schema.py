from pydantic import BaseModel
from typing import List


class SearchResult(BaseModel):
    type: str
    id: int
    title: str
    description: str


class SearchResponse(BaseModel):
    results: List[SearchResult]