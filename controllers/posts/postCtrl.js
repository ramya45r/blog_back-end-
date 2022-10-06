const expressAsyncHandler = require("express-async-handler");
const Filter = require("bad-words");
const fs= require("fs");
const Post = require("../../models/post/Post");
const validateMongodbId = require("../../utils/validateMongodb");
const User = require("../../models/user/User");
const cloudinaryUploadImg = require("../../utils/cloudinary");

// create Post----------------------
const createPostCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req.file);
  const { _id } = req.user;
  // validateMongodbId(req.body.user);
  //Check for bad words
  const filter = new Filter();
  const isProfane = filter.isProfane(req.body.title, req.body.description);
  //Block user
  if (isProfane) {
    await User.findByIdAndUpdate(_id, {
      isBlocked: true,
    });
    throw new Error(
      "Creating Failed because it contains profane words and you have been blocked"
    );
  }

  //1. get the oath to img
  const localPath = `public/images/posts/${req.file.filename}`;
  //upload to cloudinary
  const imgUploaded = await cloudinaryUploadImg(localPath);
 

  // console.log(req.file);
  try {
    // const post = await Post.create({
    //   ...req.body,
    //   image: imgUploaded?.url,
    //   user: _id,
    // });
    res.json(imgUploaded);
    //Remove uploaded img 
    fs.unlinkSync(localPath)

  } catch (error) {
    res.json(error);
  }
});

//--------------Fetch all posts --------------------------------//
const  fetchPostsCtrl = expressAsyncHandler(async (req, res) => {
try{
 const posts =await Post.find({}).populate("user")
 res.json(posts);
}catch(error){

}
})

module.exports = { createPostCtrl,fetchPostsCtrl };
