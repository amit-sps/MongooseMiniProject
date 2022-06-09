const routes=require("express").Router()
const {signup}=require("../controllers/auth")
routes.post("/",signup)

module.exports=routes;