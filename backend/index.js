import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import ProductRoute from "./routes/ProductRoute.js";
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(ProductRoute);

app.listen(process.env.APP_PORT, '192.168.1.7', function(err){
    if (err) console.log("error", err)
    console.log('Server up and running', process.env.APP_PORT);
});