# 🚗 Plataforma de Revenda de Veículos - Tech Challenge SOAT

API para empresa de revenda de veículos automotores construída com Node.js, Express, TypeScript e Firebase Firestore seguindo princípios SOLID e Clean Architecture.

## 📌 Funcionalidades

- ✅ Cadastrar veículos (marca, modelo, ano, cor, preço)
- ✅ Editar dados dos veículos
- ✅ Realizar venda de veículos (CPF do comprador, data da venda)
- ✅ Listar veículos disponíveis para venda, ordenados por **preço (crescente)**
- ✅ Listar veículos vendidos, ordenados por **preço (crescente)**
- ✅ Webhook para receber status de pagamento (efetuado ou cancelado)

## 📁 Estrutura do Projeto

```
src/
├── domain/
│   ├── entities/         # Entidades de negócio
│   ├── errors/           # Exceções customizadas
│   └── middlewares/      # Middlewares de domínio
├── infra/
│   ├── config/           # Configurações (Swagger, etc)
│   ├── controllers/      # Controllers HTTP
│   ├── middlewares/      # Middlewares de infraestrutura
│   ├── repositories/     # Repositórios Firebase
│   └── routes/           # Rotas da API
└── useCases/             # Casos de uso da aplicação
tests/                    # Testes unitários e integração
```

## 🚀 Como Rodar Localmente

```bash
# Instalar dependências
npm install

# Rodar em desenvolvimento
npm start

# Executar testes
npm test
```

## 🐳 Deploy com Docker

```bash
# Construir imagem
docker build -t fiapsub1 .

# Executar container
docker run -p 3000:3000 fiapsub1

# Ou usar docker-compose
docker-compose up --build
```

## ☸️ Deploy com Minikube

```bash
# Iniciar Minikube
minikube start

# Construir imagem no Docker do Minikube
eval $(minikube docker-env)
docker build -t fiapsub1:latest .

# Criar o secrets com o JSON do firebase
kubectl create secret generic firebase-adminsdk \
  --from-file=fiapsub1-firebase-sdk.json=./fiapsub1-firebase-sdk.json

# Aplicar manifests Kubernetes
kubectl apply -f k8s/


# Configurando port-forward na porta 9000
kubectl port-forward deployment/fiapsub1-deployment 3000:3000
```

## 🔧 Tecnologias

- Node.js + TypeScript
- Express.js
- Firebase Firestore
- Jest (Testes)
- Docker + Kubernetes
- GitHub Actions (CI/CD)
