

import mongoose from "mongoose"

const { Schema, model } = mongoose

const subtaskSchema = new Schema({

    subtaskDescription:{
        type: String,
        required: true,
    },
    subtaskStatus:{
        type: Boolean,
        required: true,
    },
    tid: {
        type: Schema.Types.ObjectId,
        ref: "Task",
        required: true,

    }

})

export const Subtask = model('subTask', subtaskSchema)