import { Router } from "express";
import { login, register } from "../../controllers";

const routerAuth = Router();

routerAuth.post("/register", register);
routerAuth.post("/login", login);

export default routerAuth;
