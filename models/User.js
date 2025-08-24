import mongoose from "mongoose";
const {Schema, models, model} = mongoose;
import bcrypt from 'bcryptjs';

const UserSchema = new Schema({
    userName:{type:String, required:true},
    email:{type:String, required:true},
    password:{type:String, required:true},
    role:{type:String, default:"common man"},

});

UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

export default models.User || model("User", UserSchema)