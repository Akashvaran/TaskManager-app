import mongoose from "mongoose";
 
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [5, "Name must be at least 5 characters"],
        maxlength: [20, "Name must be at most 20 characters"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
    },
    mobile: {
        type: String,
        required: [true, "Mobile number is required"],
       
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [8, "Password must be at least 8 characters long"]
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
}, {
    timestamps: true,
});

const userModel = mongoose.model('usermodel', userSchema);

export { userModel };