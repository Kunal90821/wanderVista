import mongoose from "mongoose";

const replySchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    username: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    likesCount: {
        type: Number,
        default: 0
    },
    likes: [
            {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            username: {
                type: String,
                required: true
            }
        }
    ]
},{ timestamps: true });


const commentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    username: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    likesCount: {
        type: Number,
        default: 0
    },
    likes: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                required: true
            },
            username: {
                type: String,
                required: true
            }
        }
    ],
    replies: [replySchema],   // Using the reply schema for nested comments
}, { timestamps: true });


export default mongoose.model("Comment", commentSchema);