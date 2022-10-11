const expressAsyncHandler = require("express-async-handler");
const Filter = require("bad-words");
const fs = require("fs");
const Post = require("../../models/post/Post");
const validateMongodbId = require("../../utils/validateMongodb");
const User = require("../../models/user/User");
const cloudinaryUploadImg = require("../../utils/cloudinary");

// create Post----------------------
//------------------create post---------------

const createPostController= expressAsyncHandler(async (req,res)=>{
  console.log(req.file)
  const { _id } = req.user;
 blockUser(req.user);
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

   //prevent user if his account is a starter account
 if (
   req?.user?.accountType === "Starter Account" &&
   req?.user?.postCount >= 2
 ) {
   throw new Error("Starter Account can only create two posts,Get more Followers");
 }

    //get the path to the image
const localPath = `public/images/posts/${req.file.filename}` ;
// upload to cloudinary
const imgUploaded = await cloudinaryUploadImg(localPath);

   try {
   const post = await Post.create({
      ...req.body,
      image:imgUploaded?.url,
      user:_id,

  });
    res.json(post);
  // res.json(imgUploaded);


  
  //update the user post count
  await User.findByIdAndUpdate(
    _id,
    {
      $inc: { postCount: 1 },
    },
    {
      new: true,
    }
  );
 
    //remove uploaded images
  fs.unlinkSync(localPath)

  } catch (error) {
    res.json(error);
  }
})

//--------------Fetch all posts --------------------------------//
const fetchPostsCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({});
    res.json(posts);
  } catch (error) {}
});
//--------------Fetch a single post --------------------------------//
const fetchPostCtrl = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Post.findById(id).populate("user");
    // update no.of Views
    await Post.findByIdAndUpdate(
      id,
      {
        $inc: { numViews: 1 },
      },
      { new: true }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});
//--------------Update post --------------------------------//
const updatePostCtrl = expressAsyncHandler(async (req, res) => {
  console.log(req.user);
  const { id } = req.params;
  validateMongodbId(id);
  try {
    const post = await Post.findByIdAndUpdate(
      id,
      {
        ...req.body,
        user:req.user?._id,
      },
      {
        new: true,
      }
    );
    res.json(post);
  } catch (error) {
    res.json(error);
  }
});

//--------------Delete post --------------------------------//
const deletePostCtrl =expressAsyncHandler(async (req,res)=>{
  const {id} = req.params;
  validateMongodbId(id);
  try{
  const post =await Post.findOneAndDelete(id);
  res.json(post);
  }catch(error){
    res.json(error)
  }
  res.json("Delete")

})
//--------------Like post --------------------------------//
const toggleAddLikeToPost =expressAsyncHandler(async (req,res)=>{
 //find the post to be liked
 const {postId}= req.body;
 const post =await Post.findById(postId);
 res.json(post);
})


module.exports = {
  createPostCtrl,
  fetchPostsCtrl,
  fetchPostCtrl,
  updatePostCtrl,
  deletePostCtrl,
  toggleAddLikeToPost
};
