import mongoose from "mongoose";

const catSchema = mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    age:{
        type: Number,
        required: true
    }
},{timestamps: true})


export const Cat = mongoose.model('Cat', catSchema)