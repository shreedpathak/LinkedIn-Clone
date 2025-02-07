import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {sendWelcomeEmail} from "../emails/emailHandler.js";

const signUp = async (req, res) => {
    try {
        const { name, username, email, password} = req.body;
        const existingEmail = await User.findOne({ email });
        const existingUser = await User.findOne({ username });
        if(!name || !username || !email || !password) {
            return res.status(400).json({message: "All input is required"});
        }
        if(existingEmail) {
            return res.status(400).json({message: "Email already exists"});
        }
        if(existingUser) {
            return res.status(400).json({message: "Username already exists"});
        }
        if(password.length < 8) {
            return res.status(400).json({message: "Password must be at least 8 characters long"});
        }
        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        const user = await User.create({
            name,
            username,
            email,
            password: hashPassword,
        });
        await user.save();

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
        });

        res.cookie("jwt-LinkedIn", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
            sameSite: "strict",   
            secure: process.env.NODE_ENV === "production" ? true : false
        });

        res.status(201).json({message: "User Created", user});  
        let profileURL = process.env.CLIENT_URL +"/profile/" + user.username;
        try {
            await sendWelcomeEmail(user.email, user.name, profileURL);
        } catch (error) {
            console.log({"ERROR IN SENDING WELCOME EMAIL": error.message});
        }

    } catch (error) {
        console.log({"Error in SignUp": error.message});
        return res.status(500).json({message: "Server Error"});
    }
};

const logIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(400).json({message: "All input is required"});
        }
        const user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({message: "User does not exist"});
        }
        const isMatch = await bcrypt.compareSync(password, user.password);
        if(!isMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRE,
        });

        res.cookie("jwt-LinkedIn", token, {
            httpOnly: true,
            maxAge: 3 * 24 * 60 * 60 * 1000,
            sameSite: "strict",   
            secure: process.env.NODE_ENV === "production" ? true : false
        });

        res.status(200).json({message: "User Logged In", user});  
    }catch (error) {
        console.log({"Error in LogIn": error.message});
        return res.status(500).json({message: "Server Error"});
    }
};

const logOut = async (req, res) => {
    try {
        res.clearCookie("jwt-LinkedIn");
        res.status(200).json({message: "User Logged Out"});
    }
    catch (error) {
        console.log({"Error in LogOut": error.message});
        return res.status(500).json({message: "Server Error"}); 
    }
};

const currentUser = async (req, res) => {
    try {
        res.json({message: "User Authenticated", user: req.user});
        const user = await User.findById(req.user.id).select("-password");  }
    catch (error) {
        console.log({"Error in CurrentUser": error.message});
        return res.status(500).json({message: "Server Error"}); 
    }       
}

export default { signUp, logIn, logOut, currentUser };