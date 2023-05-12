import express from "express";
import { infoUser, login, register, refreshToken, logout } from "../controllers/auth.controller.js";
// import {body} from 'express-validator'
// import { validationResultExpress } from "../middlewares/validationResultExpress.js";
import { requiereToken } from "../middlewares/requireToken.js";
import { requireRefreshtToken } from "../middlewares/requireRefreshToken.js";
import { bodyLoginValidator, bodyRegisterValidator } from "../middlewares/validatorManager.js";
const router = express.Router()

router.post('/register', bodyRegisterValidator, register)

router.post('/login', bodyLoginValidator, login)

router.get('/protected', requiereToken, infoUser )
router.get('/refresh', requireRefreshtToken, refreshToken)
router.get('/logout', logout)

export default router;