import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import {body} from 'express-validator'
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
const router = express.Router()

router.post('/register', [
    body('email', 'formato de email incorrecto').trim().isEmail().normalizeEmail(), // esto es de express validar, le pasas que en el body va a recibir email, el mensaje que devuelve si falla y el isEmail que comprueba si es un email
    body('password', 'formato de password incorrecto').trim().isLength({ min: 6 }).normalizeEmail()
], 
validationResultExpress,
register)

router.get('/login',[   
    body('email', 'formato de email incorrecto').trim().isEmail().normalizeEmail(),
    ], 
    validationResultExpress,
    login
    )


export default router;