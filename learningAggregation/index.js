const { post } = require("../models/post.model");
const router = require("express").Router();
//Multiple Lookups>>>>>>>>>>
router.get("/", async (req, res) => {
  try {
    const thePost = await post.aggregate([
        // $Lookup>>>>>>>>>
      {
        $lookup: {
          from: "users",
          localField: "uploadedBy",
          foreignField: "_id",
          as: "author",
        },
      },
      {
        $lookup: {
          from: "likes",
          localField: "likes",
          foreignField: "_id",
          as: "likes"
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "likes.userId",
          foreignField: "_id",
          as: "likedBy"
        }
      },
      {
        $lookup: {
          from: "dislikes",
          localField: "dislike",
          foreignField: "_id",
          as: "dislikes",
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "dislikes.userId",
          foreignField: "_id",
          as: "dislikedBy"
        }
      },
      {
        $lookup: {
          from: "comments",
          localField: "Comment",
          foreignField: "_id",
          as: "comments",
        }
    }
    //   $Projection>>>>>>>>
      ,
      {
        $project:{
            uploadedBy:false,
            
        }
      }
    ]);
    res.send(thePost);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get("/match",async(req,res)=>{
  try{
    const theRes=await post.aggregate([
      {$match:{}}
      
    ])
    res.send(theRes)

  }catch(err){
    console.log(err)
    res.send(err)
  }
})
module.exports = router;
