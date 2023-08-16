import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import bodyParser from "body-parser";
import cors from "cors";
import categoryRoutes  from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import path from 'path'
//configure env
dotenv.config();
//rest object



//databse config
connectDB();


const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json()) ;// for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));
//app.use(express.static(path.join(__dirname,'./client/build')))    used for deployment purpose

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//middelwares
//app.use(cors());



//rest api
app.use("*",function(req,res)
{
res.sendFile(path.join(__dirname, "./client/build/index.html"));
});



  const PORT = process.env.PORT || 8080;
//run listen
app.listen(PORT, () => {
    console.log(
      `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
        .white
    );
  });
  