// aqui reemplazarlo por los controller de algun proyecto mio, esto es para seguir el tutorial

import { nanoid } from "nanoid"
import { bodyLinkValidator } from "../middlewares/validatorManager.js"
import { Link } from "../models/Link.js"

export const getLinks = async (req, res) => {
    try{
       const links = await Link.find({uid: req.uid})

        return res.json({links})

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'error servidor'})
    }
}

export const getLink = async (req, res) => {

        try{
            const { id } = req.params
            const link = await Link.findById(id)

            if(!link) return res.status(404).json({error: "error no existe el link "})
            // para que un usuario no pueda ver ningun link de otro usuarios
            if(!link.uid.equals(req.uid))  return res.status(401).json({error: "este id no le pertenece "})

            return res.json({link})
    

        } catch (error) {
            console.log(error)
            if(error.kinf === "ObjectId" ){ // esto es un error de mongoose si no le mandas el formato del id correctamente
                return res.status(403).json({error: 'formato id incorrecto'})
            }
            return res.status(500).json({error: 'error servidor'})
        }

}

export const createLinks = async (req, res) => {
    try{
       
        const {longLink} = req.body
        const linkData = {longLink, nanoLink: nanoid(8), uid: req.uid}
        console.log('-----linkData-------', linkData)
        const link = new Link(linkData)

        const newLink = await link.save()

        return res.status(201).json({newLink})

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'error servidor'})
    }
}

export const removeLink = async (req, res) => {

    try{
        const { id } = req.params
        const link = await Link.findById(id)
        console.log('link----', link)

        // if(!link) return res.status(404).json({error: "error no existe el link "})
        // // para que un usuario no pueda ver ningun link de otro usuarios
        // if(!link.uid.equals(req.uid))  return res.status(401).json({error: "este id no le pertenece "})

        await link.deleteOne()

        return res.json({link})


    } catch (error) {
        console.log(error)
        if(error.kinf === "ObjectId" ){ // esto es un error de mongoose si no le mandas el formato del id correctamente
            return res.status(403).json({error: 'formato id incorrecto'})
        }
        return res.status(500).json({error: 'error servidor'})
    }

}


export const updateLink = async (req, res) => {

    try{
        const { id } = req.params
        const { longLink} = req.body
        const link = await Link.findById(id)
        console.log('Link----', link)

        // if(!link) return res.status(404).json({error: "error no existe el link "})
        // // para que un usuario no pueda ver ningun link de otro usuarios
        // if(!link.uid.equals(req.uid))  return res.status(401).json({error: "este id no le pertenece "})

        // await link.deleteOne()

        return res.json({link})


    } catch (error) {
        console.log(error)
        if(error.kinf === "ObjectId" ){ // esto es un error de mongoose si no le mandas el formato del id correctamente
            return res.status(403).json({error: 'formato id incorrecto'})
        }
        return res.status(500).json({error: 'error servidor'})
    }

}