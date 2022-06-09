const routes=require("express").Router()
const {signup,signin}=require("../controllers/auth")
routes.post("/signup",signup)
routes.post("/signin",signin)
module.exports=routes;