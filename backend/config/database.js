import mongoose from "mongoose";

export const connectDatabase =  () => {
    mongoose.connect(process.env.DB_URI)
        .then(data => console.log(`Database is connected to host: ${data.connection.host}`));
};
