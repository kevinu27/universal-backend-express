

import mongoose from "mongoose"

const { Schema, model } = mongoose

const taskSchema = new Schema({

    taskName: {  
        type: String,
        required: true,

    },
    deathline:{
        type: String,
        required: true,
    },
    priority:{
        type: String,
        required: true,
    },    
    taskDescription:{
        type: String,
        required: true,
    },
    taskStatus:{
        type: Number,
        required: true,
    },    
    category:{
        type: String,
        required: true,
    },
    uid: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,

    }

})

export const Task = model('Task', taskSchema)