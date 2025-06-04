import { Router } from "express";
import { login, register } from "../../controllers";
import { asyncHandler } from "../../controllers/asyncHandler";

const routerAuth = Router();

routerAuth.post("/register", asyncHandler(register));
routerAuth.post("/login", asyncHandler(login));

export default routerAuth;
