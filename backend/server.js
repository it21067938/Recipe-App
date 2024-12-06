import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
dotenv.config();

const PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
    .then(() => {
        console.log("MongoDB Connection Success...");
    })
    .catch((err) => {
        console.error("MongoDB Connection Error:", err);
    });

app.listen(PORT, () => {
    console.log(`Server is up and running on port: ${PORT} 🚀🚀🚀`);
});



import userRouter from "./routes/UserRoute.js";
app.use("/user", userRouter);
