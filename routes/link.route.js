// aqui reemplazarlo por los routes de algun proyecto mio, esto es para seguir el tutorial

import { Router } from "express";
import { createLinks, getLink, getLinks, removeLink, updateLink } from "../controllers/link.controller.js";
import { requiereToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator, paramLinkValidator } from "../middlewares/validatorManager.js";
const router = Router()

//GET /api/v1/links all links
//GET /api/v1/links/:id single link
// POST /api/v1/links create link
// PATCH/PUT /api/v1/links update link
// DELETE /api/v1/links remove link

router.get('/', requiereToken, getLinks)
router.get('/:id', requiereToken, getLink )
router.post('/', requiereToken, bodyLinkValidator, createLinks )
router.delete('/:id', requiereToken, paramLinkValidator, removeLink )
router.patch('/:id', requiereToken, paramLinkValidator, bodyLinkValidator, updateLink)






export default router