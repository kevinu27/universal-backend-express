// aqui reemplazarlo por los routes de algun proyecto mio, esto es para seguir el tutorial

import { Router } from "express";
import {  getTask, removeTask, updateTask } from "../controllers/task.controller.js";
import { createSubtask, getSubtasks } from "../controllers/subtask.controller.js";
import { requiereToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator, paramLinkValidator } from "../middlewares/validatorManager.js";
const router = Router()

//GET /api/v1/links all links
//GET /api/v1/links/:id single link
// POST /api/v1/links create link
// PATCH/PUT /api/v1/links update link
// DELETE /api/v1/links remove link

router.get('/', getSubtasks)
router.get('/:id', requiereToken, getTask )
router.post('/', requiereToken, createSubtask )
router.delete('/:id', removeTask )
router.patch('/:id', requiereToken, paramLinkValidator, bodyLinkValidator, updateTask)






export default router