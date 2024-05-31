const express=require("express")
const app=express()
const dotenv = require('dotenv');
dotenv.config({path:'config.env'});
const connectDB = require("./config/db");
const userRoutes = require("./Routers/userRoutes")
const noteRoutes = require("./Routers/noteRoutes")
const taskRoutes = require("./Routers/taskRoutes")
const {notFound,errorHandler} = require("./middleware/errorMiddleware")
connectDB();

app.use(express.json())

app.get("/", function(req,res){
    res.send("API is running");
})

app.use("/api/user", userRoutes)
app.use("/api/notes", noteRoutes)
app.use("/api/tasks", taskRoutes)

app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 5000;

app.listen(PORT, function(req,res){
    console.log(`Listening on port ${PORT}`);
})



// ayushsingh474020
// aUPbEkPdysbBpC4A