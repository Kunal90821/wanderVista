import express from "express";
import { config } from "dotenv";
import { connectDatabase } from "./config/database.js";
import { configurePassport, configureSession } from "./config/auth.js";
import cloudinary from 'cloudinary';
import fileUpload from "express-fileupload";
import cors from 'cors';


const app = express();


// handling uncaught exceptions 
process.on('uncaughtException' , (err) => {
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1);
});


// Configuring env path

config({path: './config/config.env'});


// Connecting to database

connectDatabase();

// Configutring cloudinary

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


// Using Middlewares 

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(express.json({ limit : '10mb' }));
app.use(express.urlencoded({ extended : true, limit : '10mb' }));
app.use(fileUpload());



//  Configure Session

configureSession(app);

// Configure Passport

configurePassport(app);


// Importing Routes

import user  from "./routes/userRoutes.js"
import blogs from "./routes/blogRoutes.js"

// User Routes

app.use("/api",user);
app.use("/api",blogs);


// Error handling middleware

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});


// Creating and running server

const PORT = process.env.PORT;
app.listen(PORT,()=> {
    console.log(`Server is up and running on port ${PORT}`);
});