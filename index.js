const express=require("express")
const port=process.env.PORT||9704;
const app=express();
require("./database/index")

app.get("/",(req,res)=>res.status(200).send("Mongoose Mini Project"));

app.listen(port,()=>{
    console.log(`App is running on http://localhost:${port}`);
})