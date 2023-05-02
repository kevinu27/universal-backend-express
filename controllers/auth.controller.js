import { json } from "express"
import { User } from "../models/User.js"
import jwt from 'jsonwebtoken'
import { generateRefreshToken, generateToken } from "../utils/tokenManager.js"

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
        if(!user) return res.status(403).json({ error: "no existe este usuario1"})

        const respuestaPassword = user.comparePassword(password)
        if(!respuestaPassword) { // da mucha informacion al hacker, porque ve que acerto el email al menos
            if(!user) return res.status(403).json({ error: "contraseña incorrecta"})

        }
        // Generate el token JWT
        const {token, expiresIn} = generateToken(user.id)
        generateRefreshToken(user.id, res)
        // res.cookie("token", token, {
        //     httpOnly: true,
        //     secure: !(process.env.MODO === "developer"),

        // })

        return  res.json( {token, expiresIn})

    }  catch(error) {
        console.log(error)
        return res.status(500).json({error: "error de servidor"})
    }
}

export const infoUser = async (req, res) => {
    try {
        console.log('req.uid------', req.uid)
        const user = await User.findById(req.uid).lean() // con el .lean() te devuelve un objeto javascript mucho mas liviano que todo el objeto de mongoose
        console.log('pasa de aqui')
        return res.json({ email: user.email, uid: user.id })

    } catch(error) {
        return res.status(500).json({error: "error de server"})
    }
}

export const refreshToken = (req, res) => {

    try {
        const refreshTokenCookie = req.cookies.refreshToken
        console.log('refreshTokenCookie', refreshTokenCookie)
        if(!refreshTokenCookie) throw new Error("No existe el token2")

        const { uid } = jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
        console.log("uid", uid)
        const {token, expiresIn} = generateToken(uid)

        return  res.json( {token, expiresIn})
        
    } catch (error) {
        console.log(error)
    }

}

export const logout = (req, res) => { 

    res.clearCookie('refreshToken')
    res.json({ok: true})

}