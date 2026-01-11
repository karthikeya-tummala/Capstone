import express from "express";
import { signUp, login } from "../controller/Auth/index.js";

export const authRouter = express.Router();

authRouter.post('/signup', signUp);
authRouter.post('/login', login);
