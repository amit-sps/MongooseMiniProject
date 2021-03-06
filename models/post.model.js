const Mongoose=require("mongoose");

const likesSchema=new Mongoose.Schema({
    userId:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    post:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:"post"
    }
})
const disLikesSchema=new Mongoose.Schema({
    userId:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:"user"
    },
    post:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:"post"
    }
})
const commentSchema=new Mongoose.Schema({
    text:{
        type:String,
        required:true
    },
    userId:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    post:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:"post",
        required:true
    }
})

const PostSchema=new Mongoose.Schema({
    tittle:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    subtittle:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    content:{
        type:String,
        required:true,
        minlength:5,
    },
    uploadedBy:{
        type:Mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    likes:[{
        type:Mongoose.Schema.Types.ObjectId,
        ref:"like"
    }],
    Comment:[{
        type:Mongoose.Schema.Types.ObjectId,
        ref:"comment"
    }],
    dislike:[{
        type:Mongoose.Schema.Types.ObjectId,
        ref:"dislike"
    }]
})



exports.post=new Mongoose.model("post",PostSchema);
exports.likes=new Mongoose.model("like",likesSchema);
exports.disLike=new Mongoose.model("dislike",disLikesSchema);
exports.comment=new Mongoose.model("comment",commentSchema);