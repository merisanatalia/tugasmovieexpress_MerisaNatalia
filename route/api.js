import express from "express";
import * as movieController from "../controllers/movieController.js";


const api = express.Router()

api.post("/movie", movieController.createMovie)
api.get("/movie", movieController.listMovie)
api.get("/movie/:id", movieController.listMovie)
api.put("/movie/:id", movieController.updateMovie)
api.delete("/movie/:id", movieController.deleteMovie)

export default api