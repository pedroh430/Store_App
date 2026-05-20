from pydantic import BaseModel

class ProductCreate(BaseModel):
    name: str
    price: float
    imgUrl: str | None = None

class ProductResponse(BaseModel):
    id:int
    name: str
    price: float
    imgUrl: str | None = None

    class Config:
        from_attributes = True
