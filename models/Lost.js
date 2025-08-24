import mongoose from "mongoose";
const {Schema, models, model} = mongoose;

const LostSchema = new Schema({
    itemName:{type:String, required:true},
    address:{type:String, required:true},
    image:{type:String, required:true},
    phoneNumber:{type:Number, required:true},
    role:{type:String, default:"Lost"},
    report:{type:Date, default:Date.now},
    seekerEmail:{type:String, required:true},
    seekerName:{type:String}
}, { timestamps: true })

export default models?.Lost || model("Lost", LostSchema)