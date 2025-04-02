import express from "express";
import cors from "cors";

import {
  routerAuth,
  routerLevel,
  routerQuestion,
  routerSection,
  routerUser,
} from "./routes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", routerAuth);

app.use("/api/users", routerUser);
app.use("/api/levels", routerLevel);
app.use("/api/sections", routerSection);
app.use("/api/questions", routerQuestion);

export default app;
