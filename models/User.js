import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        trim: true, // para recortar espacios antes y despues
        unqieu: true,
        lowercase: true,
        index: { unique: true } // para base de datos con muchas entradas esto es mejor, pero ocupa mas recursos de la base de datos
    },
    password: {
        type: String,
        required: true
    }

})

export const User = model('user', userSchema)