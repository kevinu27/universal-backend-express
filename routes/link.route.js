// aqui reemplazarlo por los routes de algun proyecto mio, esto es para seguir el tutorial

import { Router } from "express";
import { createLinks, getLink, getLinks } from "../controllers/link.controller.js";
import { requiereToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator } from "../middlewares/validatorManager.js";
const router = Router()

//GET /api/v1/links all links
//GET /api/v1/links/:id single link
// POST /api/v1/links create link
// PATCH/PUT /api/v1/links update link
// DELETE /api/v1/links remove link

router.get('/', requiereToken, getLinks)
router.get('/:id', requiereToken, getLink )
router.post('/', requiereToken, bodyLinkValidator, createLinks )






export default router