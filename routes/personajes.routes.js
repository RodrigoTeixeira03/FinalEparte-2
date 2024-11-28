import { Router } from "express";
import * as controller from "../controller/personajes.controller.js"

const personaje = Router()

personaje.get('/', controller.getAllPersonajes)
personaje.get('/:id', controller.getIDPersonaje)
personaje.post('/', controller.postPersonaje)
personaje.put('/:id', controller.putPersonaje)
personaje.delete('/:id', controller.deletePersonaje)

export default personaje