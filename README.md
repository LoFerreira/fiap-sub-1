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

````bash
# Instalar dependências
npm install

### 🔑 Configuração do Firebase

1. **Crie um arquivo na raiz do projeto chamado** `fiapsub1-firebase-sdk.json`.

2. **Adicione o conteúdo do JSON de credenciais do Firebase ao arquivo** `fiapsub1-firebase-sdk.json`:

```json
{
  "type": "service_account",
  "project_id": "fiapsub1",
  "private_key_id": "16979828c3a3a9c6ca41e1ee1e46033fa0f399c7",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDR1YQK47Ua8DT8\nc4tcvy1oXKr5XPJPCN/3GCRtM7isHTROdodcuA9s2VfxD9/CYrxTT4gsoPj9WE4F\nR/rHB1H8Z1Oek8QSsE5DjsevDcC4dwv+VHevpWUo/DgB8TxGZgJx/gSHJqkdgV3M\n7KjHr3kECTwvsAT4uW6oEbU0vpYMgqtzPpuioTEgOx8mqI+JGs2aNsdv1Jil2E1L\nzSSvriUmC3ukjh5Gg+15SnoZVOjLN9yC+OLMmkzLJcGkU/hWA388GP77Cb4YRxk4\nBwVGzsTLZVGdaifWruB8tESk5OYbdz7e/56GJFbeC+CviH+EHx5UcOgFGf3+3lHx\nynVQUqzxAgMBAAECggEAKn3Nl6PtZndaj325bK5lHFNZpxYIlnMiYWfw5nE5Fhdy\n4mmztxWpv/3SRmVTx0oVv1wlY/4z9Z+mawDcumWT12Q4JW5gX/V2X81fx+XlzyUC\nV34U34uDbPWIRPJsJYheOeW51oGAcRJjo44QDqHMxIG3P6PqGdD5JM0zL+thOMZ2\nWA9Zu9WNkzoEWnvMqNjyUGqXL7/SUXyHwDofczbBKjwuYurnSQOxD9Py/l4qLFFP\n0RlHVMQViIRU6ey6PvGwqwPWc1oOtA5cApZCQCP0zOo1REJMRQuwClQ3xPEg1Awm\nVQaVzB9c0n0adfmWTYjhQfSDTJcMnzck9nfqq7LfbQKBgQDueJsz1cp5pLDOeO+J\nbwXWFqA2mpwsmWyurZ8vgtpLiifW6Spvw/Kk8WvwrxUrxtpSYmx/F0Ss8vNROYz+\nIsXvR9txH53ZLlH3R8rjJpfFgM+mj94x4293eg2OBVHDmS6l5sxNqOqG4moIR7Ky\n2ZZXRPWusxI9+ilPThEUQVHXdQKBgQDhQgkrBiXocv95or0zv5dgm4sJwROsdMMO\nRuBRTnIcYX9BxfgVf/zqCggtYwgSbE3Vxh2q0v+//6qmWLMxPYcri+4+pQdiL0KE\naL4rSlqxtc6TD9TRXYBsxEhCRhJsUC2/mU0MDaoPmodYz8SMjJy8pavlmIcgVQjN\nRaejs+RMDQKBgBAXJzG6LS1EBYII+vClAxnM8QZ+LCd+Oq0WnfUQuTX7nnCLzwc3\ni3nBqGzXA3CuvDBu3687nLCmu/AxF+hV5FEe4hmh7n6m93Td7Tyib/8tj9VHQ9DN\n7cl7/MomZbvy7AjZp9NdoGV1hX4FiHM050YAKyucfZCc/oiRVemt9p25AoGAV/nu\nkrsn+w1O8ja5Jojhmn2lY/3grS49MEpGOfslXihGB25GYj9GjDG21+Mht/BMxf1G\ngP0/ncFA6Q8jjUu2iy9vsU/K/nHuzMAL5eR4X4feUlmQiOS3z8MpZZjwgRUfiQFa\nsiZ0EPwNeIZNAYe5f4RFCrrzq5EKiwF1Y95Sf9ECgYEAq1qTY8+w6+2fIOMEXZHz\nzWc90ikjYKpaXZ+QmaD2xbUeh5yfyAl0JFpc4yYG2ZVIBHEewdiG6kGMFg8WRUyZ\nyZvfZNwuGQZcg3hPlRWmYx7CjVPKFyqKBHs7af/KCHccsSOdXrEivj3Wmb9eqJqN\nDoxqUbLq2HXBmdLYgSbZ718=\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@fiapsub1.iam.gserviceaccount.com",
  "client_id": "117697444906720792678",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40fiapsub1.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
````

# Rodar em desenvolvimento

npm start

# Executar testes

npm test

````

## 🐳 Deploy com Docker

```bash
# Construir imagem
docker build -t fiapsub1 .

# Executar container
docker run -p 3000:3000 fiapsub1

# Ou usar docker-compose
docker-compose up --build
````

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
