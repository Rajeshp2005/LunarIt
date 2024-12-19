import express,{Application,Request,Response} from 'express'
const app:Application =express()
import multer from "multer";
const PORT:number =3000
import * as dotenv from 'dotenv'
dotenv.config()
import './database/connection'
const bookRoutes = require('./routes/bookRoutes');
import cors from "cors";

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());
const upload = multer({ dest: "uploads/" });
app.get("/",(req:Request,res:Response)=>{
  res.send("hello world")
})


app.use('/bookapi/', bookRoutes);
app.use('/uploads', express.static("uploads"));
app.listen(PORT,()=>{
  console.log("server has started at port", PORT)
})
