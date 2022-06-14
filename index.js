const express=require("express")
const port=process.env.PORT||9704;
const app=express();
const authRoute=require("./routes/auth")
const postRoute=require("./routes/post");
const aggregateRoute=require("./learningAggregation")
// Connecting Database
require("./database")

// middleware
app.use(express.json());

app.use("/auth",authRoute);
app.use("/post",postRoute);
app.use("/aggregate",aggregateRoute);
app.get("/",(req,res)=>res.status(200).send("Mongoose Mini Project"));

app.listen(port,()=>{
    console.log(`App is running on http://localhost:${port}`);
})