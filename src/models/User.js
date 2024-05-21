const { Schema, models, model } = require("mongoose");
import bcrypt from "bcrypt";

const UserScheme = new Schema({
    name: { type: String},
    email: {
      type: String,
      required: true, 
      unique: true,
    },
    phone: { type: String},
    address: { type: String},
    admin: { type: Boolean, default: false},
    password: {
        type: String,
        required: true,
        validate: pass=>{
            if(!pass?.length || pass.length<5){
              throw new Error("Password must be at least 5 characters")
            }
        }
    }
}, {timestamps: true});

UserScheme.post("validate", function(user){
    const notHashPassword= user.password;
    const salt = bcrypt.genSaltSync(10);
    user.password = bcrypt.hashSync(notHashPassword, salt);
})

export const User= models?.User || model('User', UserScheme)