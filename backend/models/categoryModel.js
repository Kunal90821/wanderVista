import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter category name"],
        unique: true,
        trim: true,
        minLength: [3, "Category name should contain atleast 3 characters"],
        maxLength: [20, "Category name cannot exceed more than 20 characters"]
    },
    blogs: {
        type: mongoose.Schema.ObjectId,
        ref: "Blog"
    },
    createdBy: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    }
},
{ timeStamps: true}
);

// Index for faster lookup

categorySchema.index({ name: 1 });

export default mongoose.model("Category", categorySchema);