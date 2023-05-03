import { validationResult, body } from "express-validator"

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }

    next()
}

export const bodyRegisterValidator = [
    body('email', 'formato de email incorrecto')
    .trim()
    .isEmail()
    .normalizeEmail(), // esto es de express validar, le pasas que en el body va a recibir email, el mensaje que devuelve si falla y el isEmail que comprueba si es un email
    body('password', 'formato de password incorrecto')
    .trim()
    .isLength({ min: 6 })
    .normalizeEmail(),
    validationResultExpress
] 


export const bodyLoginValidator = [   
    body('email', 'formato de email incorrecto').trim().isEmail().normalizeEmail(),
    validationResultExpress
    ]
  