const mongoose = require('mongoose')




const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Post title is required'],
        trim:true,
    },
    // Created by only category
    category:{
        type:String,
        required:[true,'Post category is required'],
       default:"All",
    },
    isLiked:{
        type:Boolean,
        default:false,
    },
    isLiked:{
        type:Boolean,
        default:false,
    },
    numViews:{
        type:Number,
        default:0,
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
             ref:"User",
        }
    ],
    disLikes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        }
    ],
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"Please Author is required"]
    },
    description:{
        type:String,
        required:[true,'Post description is required'],
    },
    image:{
        type:String,
       default:'https://images.pexels.com/photos/13862516/pexels-photo-13862516.jpeg?auto=compress&cs=tinysrgb&w=600',
    }
},{
    toJSON:{
        virtuals:true,
    },
    toObject:{
       virtuals:true, 
    },
    timestamps:true,
}
);

//compile
const Post = mongoose.model("Post", postSchema);

module.exports =Post;


