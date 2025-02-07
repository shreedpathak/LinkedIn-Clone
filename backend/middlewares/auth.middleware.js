import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
    try{
        const token = req.cookies["jwt-LinkedIn"];
        if(!token){
            return res.status(401).json({message: "Unauthorized - token not found"});
        }
        const decode = req.jwt.verify(token, process.env.JWT_SECRET);
        if(!decode){
            return res.status(401).json({message: "Unauthorized - token not valid"});
        }
        const user = await User.findById(decode.id).select("-password");
        if(!user){
            return res.status(404).json({message: "User not found"});
        }
        req.user = user;
        next();
    }catch(error){
        console.log({"Error in Auth Middleware": error.message});
        return res.status(500).json({message: "Server Error"});
    }
 }