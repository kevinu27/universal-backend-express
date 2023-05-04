import axios from "axios"
import { validationResult, body } from "express-validator"

export const validationResultExpress = (req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array()})
    }

    next()
}
export const bodyLinkValidator = [
    body("longLink", "formato link incorrecto")
    .trim()
    .notEmpty()
    // .custom(async (value) => { // esto seria para validar que sea una url valida
    //     try {
    //         if (!value.startsWith("https://")) {
    //             value = "https://" + value;
    //         }
    //         await axios.get(value);
    //         return value;
    //     } catch (error) {
    //         // console.log(error);
    //         throw new Error("not found longlink 404");
    //     }
    // })
    ,
    validationResultExpress

]

export const bodyRegisterValidator = [
    body('email', 'formato de email incorrecto1')
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
    body('email', 'formato de email incorrecto2').trim().isEmail().normalizeEmail(),
    validationResultExpress
    ]
  