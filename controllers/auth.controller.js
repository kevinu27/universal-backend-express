import { json } from "express"
import { User } from "../models/User.js"
import jwt from 'jsonwebtoken'

export const register = async (req, res) => {
   
    const { email, password } = req.body

    try {
        // *alternativa de lanzar el error mirando si existe el email ya en la DB
        let user = await User.findOne({email})
        
        if(user) throw ({code: 1100}) // el codigo de error de 1100 es el error de usuario ya en el base de datos
        user = new User({email, password})
        
        await user.save() 
        // aqui va el jwt
        return res.status(201).json({})
    }
    catch(error) {
        console.log(error.message) 
        // *alternativa de lanzar el error por defecto de mongoose, es redudante tener las dos alternativas
        if (error.code === 1100) {
            return res.status(400).json({ error: "ya existe este suario"})
        }
        return res.status(500).json({error: "error de servidor"})
    }
}

export const login = async (req, res) => {
    try {
        
        const { email, password } = req.body

        let user = await User.findOne({email})
        if(!user) return res.status(403).json({ error: "no existe este usuario"})

        const respuestaPassword = user.comparePassword(password)
        if(!respuestaPassword) { // da mucha informacion al hacker, porque ve que acerto el email al menos
            if(!user) return res.status(403).json({ error: "contraseña incorrecta"})

        }

        const token = jwt.sign({ uid: user._id }, process.env.JWT_SECRET)

        res.json({ token})

    }  catch(error) {
        console.log(error)
        return res.status(500).json({error: "error de servidor"})

    }

}
