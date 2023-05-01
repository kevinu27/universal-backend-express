import mongoose from "mongoose";
import bcryptjs from 'bcryptjs'

const userSchema = new mongoose.Schema({
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
    },
})

// el pre es para hacer algo antes de que se guarde el user o lo el schema que estes usando, 
//y en este caso lo que queremos es el evento del guardar, por lo que hay que poner "save"
// la funcion tiene que ser function no puede ser una arrow function porque hace falta el scope del this
userSchema.pre("save", async function(next){
    const user = this

    if(!user.isModified('password')) return next()

    try {
        const salt = await bcryptjs.genSalt(10)
        user.password = await bcryptjs.hash(user.password, salt)
        next()
    } catch (error) {
        console.log(error)
        throw new Error("fallo el hash del password")
    }

})

userSchema.methods.comparePassword = async function(candidatePassword){
    return await bcryptjs.compare(candidatePassword, this.password)
}

export const User = mongoose.model('User', userSchema)