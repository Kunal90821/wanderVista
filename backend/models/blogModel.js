import mongoose from "mongoose";


// Reply Schema

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
            }
        }
    ]
}, {timestamps: true});


// Calculating likes count dynamically using Mongoose Virtual

replySchema.virtual('likesCount').get(function() {
    return this.likes.length;
});


// Comment Schema

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
            }
        }
    ],
    replies: [replySchema]
}, {timestamps: true});


// Calculating likes count dynamically using Mongoose Virtuals

commentSchema.virtual('likesCount').get(function() {
    return this.likes.length;
})


// Blog Schema

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter title"],
        minLength: [4, "Title should have more than 4 characters"]
    },
    content: {
        type: String,
        required: [true, "Please enter content"],
        minLength: [50, "Blog should have more than 50 characters"]
    },
    media: [
        {
            public_id: String,
            url: String,
        }
    ],
    author: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    authorName: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: [true, "Please enter category"],
        minLength: [3, "Category should have more than 3 characters"],
        maxLength: [12, "Category cannot exceed more than 12 characters"]
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
            },
            avatar: {
                public_id: String,
                url: String
            }
        }
    ],
    comments: [commentSchema]
}, {timestamps: true});


// Calculating blogs likes count dynamically using mongoose virtual

blogSchema.virtual("likesCount").get(function() {
    return this.likes.length;
});


// Indexes for sorting comments and blogs

replySchema.index({createdAt: -1});
commentSchema.index({ user: 1, createdAt: -1});
blogSchema.index({ author: 1, createdAt: -1});


export default mongoose.model("Blog", blogSchema);