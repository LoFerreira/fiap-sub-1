FROM node:20-alpine AS builder

RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm ci --only=production=false

COPY src/ ./src/

RUN npx tsc

FROM node:20-alpine AS production

RUN addgroup -g 1001 -S nodejs && \
    adduser -S nextjs -u 1001

WORKDIR /app

COPY package*.json ./

RUN npm ci --only=production && npm cache clean --force

COPY --from=builder /app/lib ./lib

RUN cat > fiapsub1-firebase-sdk.json << 'EOF'
{
  "type": "service_account",
  "project_id": "fiapsub1",
  "private_key_id": "2ff2ab0b6609a3914d606b9d3f40a26cf7039558",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCVHD4x3Sgsj1QR\n+Ryz6RXZ4eMeKFfpqWveIS0d/ztYtUXKWG1Dgcywn1TCIAPjsvkIuXzB9YYQ8+iP\n7gS66sBtWiIn+g76XVXMpibiYbgE8YqcqHNb134sJbdF7DTH+QXr48EizbMWn24E\nzdZJvxPNDhzo3Xyy3jN2HDKEOdp5f6o9Od9Drd7swmOFdGpz3HoHE3wXE6HA0iT1\nIQwReJKbLVj/uT619hxu/MjN5WdL9NqdoCcMyiPmCIRRVBoKpUUjeg3MysdlDWHJ\nJgOqk5Pf8MeTtLoZ3RZ/wOMS48d1NeW0LBJd1gkicKNo8YjAvFkGSt9LjcZtXc4L\nRxEObQbnAgMBAAECggEACPgH7avlzLhaUDJxvYiZnd9ub9PxZcahDF1mf1Vo1m8g\n4YjsGZFnJICQ8pRGZ53OSO4PSQNhqwdgx7eDZVLVfD5dq5Xo7LpMfODJmfhSv0lg\nEwg22CFgH3utSHFqw1SBPK0YYuWIjiXM0lEnQIxTvpPIvWEFLSUcZ1BO4ZExSPmD\nUOt+EGgTrKDndmoibXdAOrjA80IU4NkZXPzitMMjfNlTnlcV9HrzGOx4REJTgKvl\nVzi1duy23yC8ztmBjT3yE0tr65ooJOqyLOFJIJVUC5vHOJ82W2qpiuW1SCSqxvpx\nbPgisc/Jl+HqwiqmF/NcQEqoZKqQ1cnousGFx50MQQKBgQDQGZo5lwt8TLUgU2ay\nrOQhw539pljH5JtSz0SdOSB1gfiM4UFruNpLhzzLJE7OH2LLOI+WxQmcXUfpREDW\naJC5MOOeQzuETT5K5wi2cM4/6kPW+YZFSp9CnAS8Gxha3htnXnF8DtGLtneUviXa\nt/75oD4AN7dtKY001r4PbydmdwKBgQC3bqTHUhi0JWeGhPH/f69ewmvGIppfD2O/\nLeXN8Uq4LhCHj/C58wyEaYgQUX0oHF/LZKv9RrON6KGyljYtPp9Obqirm1k/QbTp\nc55nuvmhTy017xjVAyDuahU9k8mtCQ/RG9RTbBSBFHac4ktWlXBWuBPXMtEvjKGM\nCzdGYvPPEQKBgArp3NG6XyrUpwcb+J3UPV6b8LQ1viA1mAO+xP1t2orvFwbkZVbt\n6dzeKc0JiWx77uVzgOxKRxfBOJ0+LBxSfYyIyNcq9XsZxfONrEJNJjPp6Ebk7SrD\nIBkRL5ph3WQek9dW96Km8ExgdGMDmd6fmaqjwbynL2J1NGeZ/3u1u54/AoGAKznz\nstTx5WH7J4Qk0yTv2tDOPP7iigxCYUcbpJB8HzMbyhZtkCRqirmjytSpPc6R9Ihg\nz2rd3U8467DiS386Y21IakhNm86MJ4eLiL5THWRfLxqNK4V1OTnej4hIOnKsO4bn\nXlFV86Uy3n2la14D/yuZ4VikWyQ03Z+3AutGsUECgYB6hIKJrdx8I0ESgJJLLGZq\nFNhsFXzEU/ihr8AqwldOLCq6aN/+3QhUTaAdgsqapNVqWucgmzggBCufzAsDZEv1\ni0GXJ3mZ3vbQD0T4FOwmZmPc9mWG5ekkQn3Kl8naBHuaKCBN2gRYRupHL23dVHRL\nOCazRnxR/De6Vu8T2pS4FQ==\n-----END PRIVATE KEY-----\n",
  "client_email": "firebase-adminsdk-fbsvc@fiapsub1.iam.gserviceaccount.com",
  "client_id": "117697444906720792678",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
  "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40fiapsub1.iam.gserviceaccount.com",
  "universe_domain": "googleapis.com"
}
EOF

RUN echo "NODE_ENV=production" > .env && \
    echo "PORT=3000" >> .env && \
    echo "HOST=0.0.0.0" >> .env && \
    echo "FIREBASE_PROJECT_ID=fiapsub1" >> .env && \
    echo "GOOGLE_APPLICATION_CREDENTIALS=/app/fiapsub1-firebase-sdk.json" >> .env

ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0
ENV FIREBASE_PROJECT_ID=fiapsub1
ENV GOOGLE_APPLICATION_CREDENTIALS=/app/fiapsub1-firebase-sdk.json

RUN chown -R nextjs:nodejs /app
USER nextjs

EXPOSE 3000

CMD ["node", "./lib/index.js"]