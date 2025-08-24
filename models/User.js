import mongoose from "mongoose";
const {Schema, models, model} = mongoose;

const UserSchema = new Schema({
    userName:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    role:{type:String, default:"common man"},

})

export default models.User || model("User", UserSchema)