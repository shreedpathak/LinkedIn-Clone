import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "",
    },
    bannerPic: {
        type: String,
        default: "",
    },
    headline: {
        type: String,
        default: "LinkedIn User",
    },
    about: {
        type: String,
        default: "",
    },
    skills: {
        type: [String],
        default: [],
    },
    experience: [
        {
            title: {
                type: String,
                required: true,
            },
            employmentType: {
                type: String,
                required: true,
            },
            company: {
                type: String,
                required: true,
            },
            location: {
                type: String,
                required: true,
            },
            startDate: {
                type: Date,
                required: true,
            },
            endDate: {
                type: Date,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
        },
    ],
    education: [
        {
            school: {
                type: String,
                required: true,
            },
            degree: {
                type: String,
                required: true,
            },
            fieldOfStudy: {
                type: String,
                required: true,
            },
            startDate: {
                type: Date,
                required: true,
            },
            endDate: {
                type: Date,
                required: true,
            },
            description: {
                type: String,
                required: true,
            },
        },  
    ],
    connections: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }],

}, { timestamps: true });

const User = mongoose.model("User", userSchema);
export default User;