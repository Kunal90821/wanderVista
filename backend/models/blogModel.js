import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please enter title'],
        minLength: [4, 'Title should have more than 4 characters']
    },
    content: {
        type: String,
        required: [true, 'Please enter content'],
        minLength: [50, 'Content should have more than 50 characters']
    },
    media:[
        {
            public_id: {
                type: String
            },
            url: {
                type: String
            }
        }
    ],
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    published_on: {
        type: Date,
        default: Date.now
    },
    category: {
        type: String,
        required: [true, 'Please enter category'],
        minLength: [3, 'Category should have more than 3 characters'],
        maxLength: [12, 'Category cannot exceed 12 characters']
    },
    like: {
        type: Number,
        default : 0
    },
    comments : [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: "User",
                requried: true,
            },
            comment: {
                type: String,
                required: true
            }
        }
    ]
});

export default mongoose.model("Blog",blogSchema);