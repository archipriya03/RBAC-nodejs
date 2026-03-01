const express =require("express");
const dotenv =require("dotenv").config();
const dbConnect=require("./config/dbConnect");
const authRoutes=require("./routes/authRoutes");
const userRoutes=require("./routes/userRoutes");

const app = express();
dbConnect();
//middleware
app.use(express.json());

//routes
app.use("/api/auth",authRoutes);
app.use("/api/users",userRoutes);
//start the server
const PORT=process.env.PORT || 7002; //PROCESS IS USED TO GET THE VALUE FROM ENV FILE AND IF 7001 is not avilable the 7002 
app.listen(PORT,()=>
{ 
    console.log(`server is running at port ${PORT}`);
});