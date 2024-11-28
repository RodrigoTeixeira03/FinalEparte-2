import { Router } from "express";
import ejemplo from "./ejemplo.routes.js";
import personaje from "./personajes.routes.js";

const indexRouter = Router()

indexRouter.use('/ejemplo', ejemplo)
indexRouter.use('/lol', personaje)

export default indexRouter