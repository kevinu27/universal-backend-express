//aqui vendran los partidos, o los productos del e-commerce, o lo que sea que vaya a guardar en la base de datos
// cambiarlo para mi proyeto, esto con links es para ir siguiendo el tutorial

import mongoose from "mongoose"

const { Schema, model } = mongoose

const linkSchema = new Schema({

    longLink: {  // esto es el esquema de lo que vamos a guardar y dentro va a tener al usuario que va ser el autor de ese link  
        type: String,
        required: true,
        trim: true,
    },
    nanoLink:{
        type: String,
        required: true,
        trim: true,
        unique: true, 
    },
    uid: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,

    }

})

export const Link = model('Link', linkSchema)