#!/usr/bin/env bash
set -euo pipefail

# Script para iniciar Minikube, construir a imagem, aplicar manifests,
# criar Secret com o JSON do Firebase e fazer port-forward para a API.
# Requisitos: minikube, kubectl, docker, bash.

APP_NAME="fiapsub1"
NAMESPACE="default"
IMAGE_TAG="${APP_NAME}:latest"
SERVICE_NAME="fiapsub1-service"
CONFIGMAP_FILE="k8s/configmap.yaml"
DEPLOYMENT_FILE="k8s/deployment.yaml"
SERVICE_FILE="k8s/service.yaml"
FIREBASE_SECRET_NAME="firebase-adminsdk"
FIREBASE_JSON_LOCAL="fiapsub1-firebase-sdk.json"
FIREBASE_JSON_KEY="fiapsub1-firebase-sdk.json"
SECRET_MOUNT_PATH="/var/secrets/${FIREBASE_JSON_KEY}"

bold() { echo -e "\033[1m$*\033[0m"; }
info() { echo -e "🔹 $*"; }
ok() { echo -e "✅ $*"; }
warn() { echo -e "⚠️  $*"; }
err() { echo -e "❌ $*"; }

bold "🚀 Start ${APP_NAME} no Minikube"
echo "=================================="

# 1) Validar arquivos
if [[ ! -f "${DEPLOYMENT_FILE}" || ! -f "${SERVICE_FILE}" || ! -f "${CONFIGMAP_FILE}" ]]; then
  err "Manifests k8s não encontrados (deployment/service/configmap)."
  exit 1
fi

# 2) Garantir Minikube em execução
if ! minikube status >/dev/null 2>&1; then
  info "Iniciando Minikube..."
  minikube start
else
  ok "Minikube já está em execução"
fi

# 3) Usar Docker do Minikube
info "Configurando Docker environment do Minikube..."
eval "$(minikube docker-env)"

# 4) Construir imagem dentro do Minikube
bold "🏗️  Build da imagem ${IMAGE_TAG}"
docker build -t "${IMAGE_TAG}" .

# 5) ConfigMap
bold "⚙️  Aplicando ConfigMap"
kubectl apply -f "${CONFIGMAP_FILE}"

# 6) Secret do Firebase (arquivo JSON)
if ! kubectl get secret "${FIREBASE_SECRET_NAME}" -n "${NAMESPACE}" >/dev/null 2>&1; then
  if [[ -f "${FIREBASE_JSON_LOCAL}" ]]; then
    info "Criando Secret ${FIREBASE_SECRET_NAME} com ${FIREBASE_JSON_LOCAL}"
    kubectl create secret generic "${FIREBASE_SECRET_NAME}" \
      -n "${NAMESPACE}" \
      --from-file="${FIREBASE_JSON_KEY}=${FIREBASE_JSON_LOCAL}"
  else
    err "Arquivo ${FIREBASE_JSON_LOCAL} não encontrado na raiz do projeto."
    exit 1
  fi
else
  ok "Secret ${FIREBASE_SECRET_NAME} já existe"
fi

# 7) Deployment e Service
bold "🚀 Aplicando Deployment"
kubectl apply -f "${DEPLOYMENT_FILE}"

bold "🌐 Aplicando Service"
kubectl apply -f "${SERVICE_FILE}"

# 8) Aguardar pods prontos
bold "⏳ Aguardando pods ficarem prontos"
kubectl wait --for=condition=ready pod -l app="${APP_NAME}" -n "${NAMESPACE}" --timeout=180s || true

# 9) Mostrar status
bold "📊 Status do Deploy"
kubectl get pods -l app="${APP_NAME}" -n "${NAMESPACE}"
kubectl get svc -n "${NAMESPACE}"

# 10)Iniciar port-forward em background e confirmar
(kubectl port-forward svc/${SERVICE_NAME} 3000:80 -n "${NAMESPACE}" >/dev/null 2>&1 & echo $! > .pf-${APP_NAME}.pid)
sleep 1
if ps -p "$(cat .pf-${APP_NAME}.pid 2>/dev/null || echo 0)" >/dev/null 2>&1; then
  ok "Port-forward ativo em http://localhost:3000"
else
  warn "Não foi possível iniciar o port-forward automaticamente."
  echo "Você pode rodar manualmente: kubectl port-forward service/${SERVICE_NAME} 3000:80 -n ${NAMESPACE}"
fi

cat <<EOF

🎉 Ambiente pronto!

Limpeza e parada:
  • Parar e limpar recursos (mantém Minikube rodando):
      k8s/stop-minikube.sh
  • Parar tudo (inclui parar o Minikube):
      k8s/stop-minikube.sh --full


EOF
