import express from "express";
import { initializeApp } from "firebase-admin/app";
import { routes } from "./infra/routes";
import { pageNotFoundHandler } from "./infra/middlewares/page-not-found.middleware";
import { errorHandler } from "./infra/middlewares/error-handler.middleware";

initializeApp();
const app = express();

routes(app);
pageNotFoundHandler(app);
errorHandler(app);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;
