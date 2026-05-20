from ast import List
from fastapi import FastAPI, UploadFile, File, Form, Depends, HTTPException
from fastapi.staticfiles import StaticFiles
import shutil, os

from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session 
import models, schemas
from database import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

os.makedirs("uploads", exist_ok=True)
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods =["*"],
    allow_headers=["*"],
)

#Busca todos os Items
@app.get("/api/Products", response_model =list[schemas.ProductResponse])
def get_products(db: Session =Depends(get_db)):
    return db.query(models.Product).all()


# buscar por id
@app.get("/api/product/{id}", response_model=schemas.ProductResponse)
def get_product(id: int, db: Session = Depends(get_db)):
    produto = db.query(models.Product).filter(models.Product.id == id).first()
    if produto is None:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    return produto

#Criar produto com imagem
@app.post("/api/AddProduct", response_model=schemas.ProductResponse)
async def create_product(
    name: str = Form(...),
    price: float = Form(...),
    image: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # salva a imagem na pasta uploads/
    path = f"uploads/{image.filename}"
    with open(path, "wb") as buffer:
        shutil.copyfileobj(image.file, buffer)

    # monta a URL da imagem
    imgUrl = f"http://192.168.10.194:8080/uploads/{image.filename}"

    novo_produto = models.Product(name=name, price=price, imgUrl=imgUrl)
    db.add(novo_produto)
    db.commit()
    db.refresh(novo_produto)
    return novo_produto

# PUT - atualizar produto
@app.put("/api/UpdateProduct/{id}", response_model=schemas.ProductResponse)
def update_product(id: int, product: schemas.ProductCreate, db: Session = Depends(get_db)):
    db_product = db.query(models.Product).filter(models.Product.id == id).first()
    if db_product is None:
        raise HTTPException(status_code=404, detail="Produto não encontrado")
    db_product.name = product.name
    db_product.price = product.price
    db_product.imgUrl = product.imgUrl
    db.commit()
    db.refresh(db_product)
    return db_product
# Deletar produto
@app.delete("/api/DeleteProduct/{id}")
def delete_product(id: int, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == id).first()
    if product is None:
        raise HTTPException(status_code=404, detail="Produto não encontrado")

    # ✅ deleta a imagem do servidor
    if product.imgUrl:
        filename = product.imgUrl.split("/uploads/")[-1]
        path = f"uploads/{filename}"
        if os.path.exists(path):
            os.remove(path)

    db.delete(product)
    db.commit()
    return {"message": "Produto e imagem deletados com sucesso"}