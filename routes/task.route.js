// aqui reemplazarlo por los routes de algun proyecto mio, esto es para seguir el tutorial

import { Router } from "express";
import { createTask, getTask, getTasks, removeTask, updateTask } from "../controllers/task.controller.js";
import { requiereToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator, paramLinkValidator } from "../middlewares/validatorManager.js";
const router = Router()

//GET /api/v1/links all links
//GET /api/v1/links/:id single link
// POST /api/v1/links create link
// PATCH/PUT /api/v1/links update link
// DELETE /api/v1/links remove link

router.get('/', getTasks)
router.get('/:id', requiereToken, getTask )
router.post('/', requiereToken, createTask )
router.delete('/:id', requiereToken, paramLinkValidator, removeTask )
router.patch('/:id', requiereToken, paramLinkValidator, bodyLinkValidator, updateTask)






export default router