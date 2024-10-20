import { userModel } from "../model/authModel.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generateToken = (id, email,role) => {
    return jwt.sign({ id, email,role }, process.env.JWT_SECRET, { expiresIn: "1h" });
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
        const newUser = new userModel({name,email,mobile,password: hashPassword,role:'user'});
        await newUser.save();

        const token = generateToken(newUser._id, newUser.email,newUser.role);
        res.cookie("jwt", token, { maxAge: 3600000, httpOnly: true });
        res.status(201).json({
            message: "User created successfully",
            user: { id: newUser._id, name: newUser.name,role:newUser.role }
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
        const token = generateToken(user._id, user.email,user.role);
        res.cookie("jwt", token, { maxAge: 3600000, httpOnly: true });
        res.status(200).json({
            message: "Login successful",
            user: { id: user._id, name: user.name,role:user.role}
        });
    } catch (err) {
        next(err);
    }
};

export const getAllUsers = async (req, res,next) => {
    try {
        const users = await userModel.find();
        res.status(200).json({
            message: "users retrieve success",
            users,
        });
    } catch (err) {
        next(err)
    }
};


export const updateUser = async (req, res, next) => {
    const { userId } = req.params;
    const { name, email, mobile } = req.body;

    try {
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { name, email, mobile },
            { new: true, runValidators: true } 
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json({
            message: "User updated successfully",
            user: { id: updatedUser._id, name: updatedUser.name, role: updatedUser.role }
        });
    } catch (err) {
        next(err);
    }
};


export const deleteUser = async (req, res, next) => {
    console.log(req.params.id)
    const { id } = req.params; 

    try {
        const deletedUser = await userModel.findByIdAndDelete(id);

        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User deleted successfully" });
    } catch (err) {
        next(err);
    }
};


export const Verify = async (req, res) => {
    try {
        const token = req.cookies.jwt;
        if (!token) {
            return res.status(401).json({ status: false, msg: "Not authorized" });
        }
        const decodedData = jwt.verify(token, process.env.JWT_SECRET);
        res.status(200).json({ status: true, user: decodedData });
    } catch (err) {
        res.status(401).json({ status: false, msg: "Invalid token" });
    }
};

export const logout = async (req, res,next) => {
    try {
        res.clearCookie("jwt");
        res.status(200).json({ message: 'User logged out' });
    } catch (err) {
        next(err)
    }
};