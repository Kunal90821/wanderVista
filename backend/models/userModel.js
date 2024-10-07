import mongoose from "mongoose";
import validator from "validator";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required: [true, 'Please enter your username'],
        minLength: [3, 'Username should atleast have 3 characters'],
        maxLength: [15, 'Username cannot exceed more than 15 characters'],
        unique: true
    },
    name: {
        type: String,
        requried: [true, 'Please enter your name'],
        minLength: [3, 'Name should atleast have more than 3 characters'],
        maxLength: [30, 'Name cannot exceed more than 30 characters']
    },
    email: {
        type: String,
        required: [true, 'Please enter your email'],
        unique: true,
        validate: [validator.isEmail, 'Please enter a valid email']
    },
    avatar: {
        public_id: {
            type: String,
            required: false
        },
        url: {
            type: String,
            required: false
        }
    },
    role: {
        type: String,
        default: 'user'
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,

});


userSchema.plugin(passportLocalMongoose);

export default mongoose.model("User", userSchema);