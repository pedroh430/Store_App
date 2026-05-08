from ast import List

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session 
import models, schemas
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods =["*"],
    allow_headers=["*"],
)


@app.get("/products", response_model =list[schemas.ProductResponse])
def get_products(db: Session =Depends(get_db)):
    return db.query(models.Product).all()


# GET - buscar por id
@app.get("/api/produtos/{id}", response_model=schemas.ProductResponse)
def get_produto(id: int, db: Session = Depends(get_db)):
    produto = db.query(models.Product).filter(models.Product.id == id).first()
    if produto is None:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return produto

# POST - criar produto
@app.post("/api/produtos", response_model=schemas.ProductResponse)
def create_produto(produto: schemas.ProductCreate, db: Session = Depends(get_db)):
    novo_produto = models.Product(**produto.model_dump())
    db.add(novo_produto)
    db.commit()
    db.refresh(novo_produto)
    return novo_produto

# PUT - atualizar produto
@app.put("/api/produtos/{id}", response_model=schemas.ProductResponse)
def update_produto(id: int, produto: schemas.ProductCreate, db: Session = Depends(get_db)):
    db_produto = db.query(models.Product).filter(models.Product.id == id).first()
    if db_produto is None:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    db_produto.name = produto.name
    db_produto.price = produto.price
    db_produto.imgUrl = produto.imgUrl
    db.commit()
    db.refresh(db_produto)
    return db_produto

# DELETE - deletar produto
@app.delete("/api/produtos/{id}")
def delete_produto(id: int, db: Session = Depends(get_db)):
    produto = db.query(models.Product).filter(models.Product.id == id).first()
    if produto is None:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    db.delete(produto)
    db.commit()
    return {"message": "Produto deletado com sucesso"}