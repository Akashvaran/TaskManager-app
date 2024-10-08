import { userModel } from "../model/authModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (id, email) => {
    return jwt.sign({ id, email }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

export const signup = async (req, res, next) => {
    const { name, email, mobile, password } = req.body;
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({name,email,mobile,password: hashPassword});
        await newUser.save();

        const token = generateToken(newUser._id, newUser.email);
        res.cookie("jwt", token, { maxAge: 3600000, httpOnly: true });
        res.status(201).json({
            message: "User created successfully",
            user: { id: newUser._id, name: newUser.name }
        });
    } catch (err) {
        next(err);
    }
};


export const login = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        const PasswordValid = await bcrypt.compare(password, user.password);
        if (!PasswordValid) {
            return res.status(401).json({
                message: "Invalid email or password",
            });
        }
        const token = generateToken(user._id, user.email);
        res.cookie("jwt", token, { maxAge: 3600000, httpOnly: true });
        res.status(200).json({
            message: "Login successful",
            user: { id: user._id, name: user.name }
        });
    } catch (err) {
        next(err);
    }
};
