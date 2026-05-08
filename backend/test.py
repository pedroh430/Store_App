from database import engine

try:
    connection = engine.connect()
    print("✅ Conectado ao banco store com sucesso!")
    connection.close()
except Exception as e:
    print(f"❌ Erro na conexão: {e}")