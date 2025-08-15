# 🚗 Plataforma de Revenda de Veículos - Tech Challenge SOAT

API para revenda de veículos construída com Node.js, Express, TypeScript e Firebase Firestore.

## 📌 Funcionalidades

- Cadastrar/editar veículos
- Vender veículos e registrar comprador/data
- Listar disponíveis e vendidos por preço (asc)
- Webhook de pagamento (efetuado/cancelado)

## 📁 Estrutura do Projeto

```
src/
├── domain/              # Entidades e erros
├── infra/               # Controllers, repos, rotas, middlewares
├── useCases/            # Regras de negócio
└── index.ts             # Bootstrap do app (Firebase + Express)

k8s/
├── configmap.yaml       # Configuração básica
├── deployment.yaml      # Deployment do app
├── service.yaml         # Service (NodePort/ClusterIP)
├── start-minikube.sh    # Sobe tudo no Minikube e faz port-forward
└── stop-minikube.sh     # Encerra port-forward e limpa recursos

docker-compose.yml       # Dev/Prod local com bind do JSON
Dockerfile               # Build multi-stage
```

## 🔑 Configuração do Firebase (obrigatório)

O app inicializa o Firebase Admin APENAS via arquivo JSON do Service Account.

1. Crie o arquivo na raiz: `fiapsub1-firebase-sdk.json`
2. Adicione o JSON do arquivo fiapsub1-firebase-sdk.json enviado junto com o arquivo do projeto. Infelizmente não consigo compartilhar por aqui por que o firebase bloqueia a key.

## 🚀 Executar local (sem Docker)

```bash
npm install

npm start
```

Swagger endpoint:

- Docs: http://localhost:3000/api-docs

## 🧪 Testes

```bash
npm test
```

## 🐳 Docker

```bash
# Build da imagem
docker build -t fiapsub1 .

# Rodar container (bind do JSON no caminho esperado pelo app)
docker run -p 3000:3000 \
  -v "$PWD/fiapsub1-firebase-sdk.json:/app/fiapsub1-firebase-sdk.json:ro" \
  fiapsub1

# Docker Compose (já faz o bind e seta a env automaticamente)
docker compose up -d --build
```

## ☸️ Minikube (Kubernetes)

Use os scripts de conveniência:

```bash
# Subir tudo, criar Secret com o JSON e abrir port-forward
chmod +x k8s/*.sh
k8s/start-minikube.sh

# Parar port-forward e remover recursos (mantém Minikube)
k8s/stop-minikube.sh

# Parar tudo (inclui Minikube)
k8s/stop-minikube.sh --full
```

Alternativa manual (opcional):

```bash
minikube start

# Usar Docker do Minikube
eval $(minikube docker-env)

docker build -t fiapsub1:latest .

kubectl create secret generic firebase-adminsdk \
  --from-file=fiapsub1-firebase-sdk.json=./fiapsub1-firebase-sdk.json

kubectl apply -f k8s/

# Port-forward do Service (80 -> 3000 local)
kubectl port-forward service/fiapsub1-service 3000:80
```

## 🧰 Troubleshooting

- Docker Desktop vs Minikube Docker

  - Se você rodou `eval $(minikube docker-env)`, seu shell aponta para o Docker do Minikube.
  - Para voltar ao Docker Desktop: `eval $(minikube docker-env -u)` e opcionalmente `docker context use desktop-linux`.

- Erro ao iniciar container: `Error initializing Firebase Admin: ENOENT ... fiapsub1-firebase-sdk.json`
  - Garanta o bind do arquivo no `docker run` (veja seção Docker) ou que a variável `GOOGLE_APPLICATION_CREDENTIALS` esteja apontando para o caminho correto.

## 🔧 Tecnologias

- Node.js + TypeScript
- Express.js
- Firebase Admin SDK (Firestore)
- Jest (testes)
- Docker, Kubernetes (Minikube)
- GitHub Actions (CI/CD)
