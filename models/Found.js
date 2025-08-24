import mongoose from "mongoose";
const {Schema, models, model} = mongoose;

const FoundSchema = new Schema({
    itemName:{type:String, required:true},
    address:{type:String, required:true},
    image:{type:String, required:true},
    phoneNumber:{type:Number, required:true},
    role:{type:String, default:"Found"},
    report:{type:Date, default:Date.now},
    founderEmail:{type:String, required:true},
    founderName:{type:String}
}, { timestamps: true })

export default models?.Found || model("Found", FoundSchema)