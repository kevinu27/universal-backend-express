// aqui reemplazarlo por los controller de algun proyecto mio, esto es para seguir el tutorial

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
       
        const {longLinks} = await req.body
        return res.json({longLinks})

    } catch (error) {
        console.log(error)
        return res.status(500).json({error: 'error servidor'})
    }
}