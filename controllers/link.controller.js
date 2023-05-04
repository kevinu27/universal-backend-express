// aqui reemplazarlo por los controller de algun proyecto mio, esto es para seguir el tutorial

import { nanoid } from "nanoid"
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

export const createLinks = async (req, res) => {
    try{
       
        const {longLink} = req.body
        const linkData = {longLink, nanoLink: nanoid(8), uid: req.uid}
        console.log('-----linkData-------', linkData)
        const link = new Link(linkData)

        const newLink = await link.save()

        return res.json({newLink})

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'error servidor'})
    }
}