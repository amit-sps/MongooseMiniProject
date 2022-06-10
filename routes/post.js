const route=require("express").Router();
const {createPost,getAllPost,myPost,postLike}=require("../controllers/post")
const {userMiddleware}=require("../middleware/user")

route.post("/",userMiddleware,createPost)
route.get("/mypost",userMiddleware,myPost)
route.get("/like/:postid",userMiddleware,postLike)
route.get("/",getAllPost)
module.exports=route;