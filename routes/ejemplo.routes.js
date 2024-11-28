import { Router } from "express";
import * as controller from "../controller/ejemplo.controller.js"

const ejemplo = Router()

ejemplo.get('/', controller.getAllEjemplo)
ejemplo.get('/:id', controller.getIDEjemplo)
ejemplo.post('/', controller.postEjemplo)
ejemplo.put('/:id', controller.putEjemplo)
ejemplo.delete('/:id', controller.deleteEjemplo)

export default ejemplo