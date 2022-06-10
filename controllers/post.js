const { post, likes, disLike, comment } = require("../models/post.model");

exports.createPost = async (req, res) => {
  const { _id } = req;
  const { tittle, subtittle, content } = req.body;
  if (!tittle || !subtittle || !content)
    return res.status(400).send("All field is required!");
  try {
    const newPost = new post({ tittle, subtittle, content, uploadedBy: _id });
    const thePost = await newPost.save();
    if (!thePost) return res.status(400).send("post not created!");
    return res.status(200).json({ postId: thePost._id, msg: "post created !" });
  } catch (err) {
    console.log(err);
    res.status(400).send("Something went wrong!");
  }
};

exports.getAllPost=async(req,res)=>{
    try{
       
        const thePost=await post.find({}).populate("uploadedBy",["-password","-createdAt","-updatedAt"]).populate({path:"likes",model:"like",select:["userId"],populate:{path:"userId",model:"User",select:["userName","Name","email"]}}).populate({path:"dislike",model:"dislike",select:["userId"],populate:{path:"userId",model:"User",select:["userName","Name","email"]}}).populate({path:"Comment",model:"comment",select:["userId","text"],populate:{path:"userId",model:"User",select:["userName","Name","email"]}});
        if(!thePost)
        return res.status(400).send("Not Found!")
        return res.status(200).send(thePost);
    }catch(err){
        console.log(err);
        return res.status(400).send("Something went wrong!")
    }
}
exports.myPost=async(req,res)=>{
    try{
        const {_id}=req;
        const thePost=await post.find({uploadedBy:_id}).select(["-uploadedBy"]).populate({path:"likes",model:"like",select:["userId"],populate:{path:"userId",model:"User",select:["userName","Name","email"]}}).populate({path:"dislike",model:"dislike",select:["userId"],populate:{path:"userId",model:"User",select:["userName","Name","email"]}}).populate({path:"Comment",model:"comment",select:["userId","text"],populate:{path:"userId",model:"User",select:["userName","Name","email"]}});;
        if(!thePost||thePost.length===0)
        return res.status(400).send("Not Found!");
        return res.status(200).send(thePost);

    }catch(err){
        console.log(err)
        return res.status(400).send("Something went wrong!")
    }
}

exports.updatePost=async(req,res)=>{
    try{
        const {tittle, subtittle, content}=req.body;
        const {_id}=req;
        const {postid}=req.params;
        const isPostExist=await post.findById(postid);
        if(isPostExist.uploadedBy!=_id)
        return res.status(400).send("You can update only your post!")
        if(!tittle||!subtittle||!content)
        return res.status(400).send("All field is required")
        const theUpdatedPost=await post.updateOne({_id:postid},{tittle,subtittle,content});
       if(!theUpdatedPost)
       return res.status(400).send("post not updated!");
       return res.status(200).send("post updated")

    }catch(err){
        console.log(err)
        res.status(400).send("Something went wrong!");
    }
}

exports.deletePost=async(req,res)=>{
    try{
       const {_id}=req;
       const {postid}=req.params;
       if(!postid)
       return res.status(400).send("post id is required")
       const isPostExist=await post.findById(postid);
       if(!isPostExist)
       return res.status(404).send("Post Doesn't Exist!")
       if(isPostExist.uploadedBy!=_id)
       return res.status(400).send("You can delete only your post!")
    //    delete all likes related this post
      const deletingAllLikes=await likes.deleteMany({post:isPostExist._id});
       //    delete all dislike related this post
       const deletingAllDislikes=await disLike.deleteMany({post:isPostExist._id});
        //    delete all comment related this post
      const deletingAllComment=await comment.deleteMany({post:isPostExist._id});
    //   deleting post
    const deletedPost=await post.deleteOne({_id:postid});
    console.log(deletedPost)
    if(!deletedPost)
    return res.status(400).send("Something went wrong!")
    return res.status(200).send("Post Deleted !")

    }catch(err){
        console.log(err)
        return res.status(400).send("Something wrnt wrong!")
    }
}

exports.postLike=async(req,res)=>{
    try{
        const {_id}=req;
        const {postid}=req.params;
        if(!postid)
        return res.status(400).send("Post id is required!")
        const isAlreadyDisliked=await disLike.findOne({userId:_id,post:postid});
        if(isAlreadyDisliked){
            await disLike.deleteOne({_id:isAlreadyDisliked._id});
            await post.updateOne({_id:postid},{$pull:{disLike:{$gte:isAlreadyDisliked._id}}})
        }
        const isLiked=await likes.findOne({userId:_id,post:postid})
        if(isLiked){
            await likes.deleteOne({userId:_id,post:postid});
            await post.updateOne({_id:postid},{$pull:{likes:{$gte:isLiked._id}}})
            return res.status(200).send("You dislike the post");
        }
        const newLike=new likes({userId:_id,post:postid});
        const theLike=await newLike.save();
        await post.updateOne({_id:postid},{$push:{likes:theLike._id}})
        if(!theLike)
        return res.status(400).send("Something went wrong!");
        return res.status(200).send("post liked");

    }catch(err){
        console.log(err)
        return res.status(400).send("Something went wrong!");
    }
}

exports.postDislike=async(req,res)=>{
    try{
        const {_id}=req;
        const {postid}=req.params;
        if(!postid)
        return res.status(400).send("Post id is required!")
        const isAlreadyLiked=await likes.findOne({userId:_id,post:postid});
        if(isAlreadyLiked){
            await likes.deleteOne({_id:isAlreadyLiked._id});
            await post.updateOne({_id:postid},{$pull:{likes:{$gte:isAlreadyLiked._id}}})
        }
        const isDisliked=await disLike.findOne({userId:_id,post:postid})
        if(isDisliked){
            await disLike.deleteOne({userId:_id,post:postid});
            await post.updateOne({_id:postid},{$pull:{dislike:{$gte:isDisliked._id}}})
            return res.status(200).send("You removed the dislike");
        }
        const newDislike=new disLike({userId:_id,post:postid});
        const theDislike=await newDislike.save();
        await post.updateOne({_id:postid},{$push:{dislike:theDislike._id}})
        if(!theDislike)
        return res.status(400).send("Something went wrong!");
        return res.status(200).send("post Disliked");

    }catch(err){
        console.log(err)
        return res.status(400).send("Something went wrong!");
    }
}

exports.postComment=async(req,res)=>{
    try{
        const {_id}=req;
        const {text}=req.body;
        const {postid}=req.params;
        if(!text)
        return res.status(400).send("text is require!")
        if(!postid)
        return res.status(400).send("post id is required!")
        const isValidPostId=await post.findOne({_id:postid});
        if(!isValidPostId)
        return res.status(400).send("post not found!");
        const newComment=new comment({text,userId:_id,post:postid});
       const theComment=await newComment.save();
       if(!theComment)
       return res.status(400).send("Something went wrong!")
       await post.updateOne({_id:postid},{$push:{Comment:theComment._id}})
       return res.status(200).send("comment added !")
    }catch(err){
        console.log(err)
        return res.status(400).send("Something went wrong!")
    }
}

exports.updateComment=async(req,res)=>{
    try{
        const {_id}=req;
        const {commentId}=req.params;
        const {text}=req.body;
        if(!commentId)
        return res.status(400).send("comment id is require!");
        if(!text)
        return res.status(400).send("comment required");
        const isCommentExists=await comment.findById(commentId);
        if(!isCommentExists)
        return res.status(400).send("Comment Not Exists!")
        if(isCommentExists.userId!=_id)
        return res.status(400).send("You can update only your post");
        const updatedComment=await comment.updateOne({_id:commentId},{text});
        if(!updatedComment)
        return res.status(400).send("Something went wrong!")
        return res.status(200).send("Comment Updated");

    }catch(err){
        console.log(err)
        return res.status(400).send("Something went wrong!")
    }
}