# 🚗 Plataforma de Revenda de Veículos - Tech Challenge SOAT (Fase 2)

Este projeto consiste em uma API para uma empresa de revenda de veículos automotores. A aplicação foi construída com foco em SOLID e Clean Architecture, utilizando Node.js com Express, persistência via Firebase Firestore e deploy com Docker + Kubernetes.

---

## 📌 Funcionalidades Implementadas

- ✅ Cadastrar veículos (marca, modelo, ano, cor, preço)
- ✅ Editar dados dos veículos
- ✅ Realizar venda de veículos (CPF do comprador, data da venda)
- ✅ Listar veículos disponíveis para venda, ordenados por **preço (crescente)**
- ✅ Listar veículos vendidos, ordenados por **preço (crescente)**
- ✅ Webhook para receber status de pagamento (efetuado ou cancelado) via código de pagamento

---

## 🧱 Arquitetura

A aplicação segue os princípios do **SOLID** e está organizada com base na **Clean Architecture**:

```plaintext
src/
├── domain/
│   ├── entities/         # Entidades de negócio
│   ├── repositories/     # Interfaces dos repositórios
│   └── usecases/         # Casos de uso (regras de negócio)
│
├── infra/
│   ├── database/         # Implementação dos repositórios (Firebase)
│   ├── http/             # Controllers e rotas Express
│   └── webhook/          # Processamento de callbacks de pagamento
│
├── application/
│   ├── dtos/             # Data Transfer Objects
│   ├── services/         # Serviços de aplicação
│   └── validators/       # Validações
│
└── main/
	├── config/           # Configurações da aplicação
	├── routes/           # Definição das rotas
	└── server.ts         # Ponto de entrada do servidor
```

## 🚀 Como rodar localmente

### Pré-requisitos

- Node.js (18+)
- Firebase CLI (para configurar Firestore)
- Docker e Docker Compose

### Passos

```bash
# Clonar o repositório
git clone https://github.com/LoFerreira/fiap-sub-1.git
cd fiap-sub-1

# Instalar dependências
npm install

# Rodar localmente
npm start
```

### Ou usando docker

```bash
docker compose up
```

### Testes

```bash
# Rodar testes unitários
npm run test
```

## 🐳 Docker

O repositório contém:

**Dockerfile**: imagem da aplicação
**docker-compose.yml**: orquestração local
**k8s/**: arquivos de manifesto Kubernetes

- `deployment.yaml`
- `service.yaml`
- `configmap.yaml`
- `secrets.yaml`

## 📄 Documentação da API

Toda a documentação da API está disponível via Swagger:

Endpoint: GET /api-docs
