import express from "express";
import { config } from "dotenv";
import { connectDatabase } from "./config/database.js";
import { configureSession, configurePassport } from "./config/auth.js";

const app = express();


// Configuring env path

config({path: './config/config.env'});


// Connecting to database

connectDatabase();


// Using Middlewares 

app.use(express.json());
app.use(express.urlencoded({ extended : true }));


// Configure Session

configureSession(app);


// Configure Passport

configurePassport(app);


// Creating and running server

const PORT = process.env.PORT;
app.listen(PORT,()=> {
    console.log(`Server is up and running on port ${PORT}`);
});