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
       
        const thePost=await post.find({}).populate("uploadedBy",["-password","-createdAt","-updatedAt"]);
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
        console.log(_id);
        const thePost=await post.find({uploadedBy:_id}).populate("uploadedBy",["-password","-createdAt","-updatedAt"]);
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

    }catch(err){
        console.log(err)
    }
}

exports.deletePost=async(req,res)=>{
    try{
       

    }catch(err){
        console.log(err)
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

    }catch(err){
        console.log(err)
    }
}