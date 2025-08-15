import express from "express";
import { initializeApp, cert } from "firebase-admin/app";
import fs from "fs";
import { routes } from "./infra/routes";
import { pageNotFoundHandler } from "./infra/middlewares/page-not-found.middleware";
import { errorHandler } from "./infra/middlewares/error-handler.middleware";

const app = express();

try {
  const credPath =
    process.env.GOOGLE_APPLICATION_CREDENTIALS ||
    "/var/secrets/fiapsub1-firebase-sdk.json"; // fallback compatível com K8s
  const raw = fs.readFileSync(credPath, "utf8");
  const sa = JSON.parse(raw);
  initializeApp({
    credential: cert(sa as any),
    projectId: sa.project_id,
  });
} catch (error) {
  console.error(
    "Error initializing Firebase Admin:",
    (error as any)?.message || error
  );
}

// Rotas e middlewares
routes(app);
pageNotFoundHandler(app);
errorHandler(app);

const PORT = Number(process.env.PORT) || 3000;
const HOST = process.env.HOST || "0.0.0.0";

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});

export default app;
