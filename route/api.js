import express from "express";
import * as movieController from "../controllers/movieController.js";
import { authenticateTokenMiddleware } from "../middlewares/authenticateTokenMiddleware.js";
import * as userController from "../controllers/userController.js";

const api = express.Router();

// public routes ( Auth)
api.post("/signin", userController.signIn);
api.post("/signup", userController.signUp);

// protected routes (Movie)
api.get("/movie", authenticateTokenMiddleware, movieController.movies);
api.get("/movie/:id", authenticateTokenMiddleware, movieController.detailMovie);
api.post("/movie", authenticateTokenMiddleware, movieController.createMovie);
api.put("/movie/:id", authenticateTokenMiddleware, movieController.updateMovie);
api.delete("/movie/:id", authenticateTokenMiddleware, movieController.deleteMovie);

export default api