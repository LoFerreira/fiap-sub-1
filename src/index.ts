import express from "express";
import { initializeApp, cert } from "firebase-admin/app";
import { routes } from "./infra/routes";
import { pageNotFoundHandler } from "./infra/middlewares/page-not-found.middleware";
import { errorHandler } from "./infra/middlewares/error-handler.middleware";

// Configuração do Firebase Admin SDK
const serviceAccountPath =
  process.env.GOOGLE_APPLICATION_CREDENTIALS || "./fiapsub1-firebase-sdk.json";
const projectId = process.env.FIREBASE_PROJECT_ID || "fiapsub1";

try {
  initializeApp({
    credential: cert(serviceAccountPath),
    projectId: projectId,
  });
  console.log(`Firebase initialized successfully with project: ${projectId}`);
} catch (error) {
  console.error("Error initializing Firebase:", error);
  process.exit(1);
}
const app = express();

routes(app);
pageNotFoundHandler(app);
errorHandler(app);

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

export default app;
