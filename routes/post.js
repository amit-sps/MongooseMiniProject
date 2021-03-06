const route=require("express").Router();
const {createPost,getAllPost,myPost,postLike,postDislike,postComment,updatePost,deletePost,updateComment}=require("../controllers/post")
const {userMiddleware}=require("../middleware/user")

route.post("/",userMiddleware,createPost)
route.get("/mypost",userMiddleware,myPost)
route.get("/like/:postid",userMiddleware,postLike)
route.get("/dislike/:postid",userMiddleware,postDislike)
route.post("/comment/:postid",userMiddleware,postComment)
route.patch("/update/:postid",userMiddleware,updatePost)
route.delete("/:postid",userMiddleware,deletePost)
route.patch("/comment/:commentId",userMiddleware,updateComment)
route.get("/",getAllPost)
module.exports=route;