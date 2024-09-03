import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import fileUpload from "express-fileupload"
import { v2 as cloudinary } from 'cloudinary';
import cookieParser from "cookie-parser"
import userRoute from "./routes/user.route.js"
import blogRoute from "./routes/blog.route.js"

dotenv.config()
import cors from "cors"
const app = express()

const port = process.env.PORT
const MONGO_URI = process.env.MONGO_URI

// app.get("/users/register" , (req ,res) =>{
//   res.send("hello")
// })


// FOR JSON
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

//FOR FILEUPLOAD
app.use(
    fileUpload({
      useTempFiles: true,
      tempFileDir: "/tmp/",
    })
  );

//FOR DB CONNECTION
try {
    mongoose.connect(process.env.MONGO_URI);
    console.log("Conntected to MonogDB");
  } catch (error) {
    console.log(error);
  }


// for Routes
app.use("/api/users", userRoute)
app.use("/api/blogs" ,blogRoute)

cloudinary.config({ 
    cloud_name:process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY, 
    api_secret: process.env.API_SECRET // Click 'View API Keys' above to copy your API secret
});



app.listen(port, () => {
    console.log(`server in running on port ${port}`);


})