import express from "express";
import { SignUp } from "../controller/Auth/SignUp.Controller.js";

export const authRouter = express.Router();

authRouter.post('/signup', SignUp);
