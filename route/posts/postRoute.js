const express = require('express');
const { createPostCtrl,fetchPostsCtrl ,fetchPostCtrl} = require('../../controllers/posts/postCtrl');
const authMiddleware = require('../../middlewares/auth/authMiddleware');
const { PhotoUpload,postImgResize } = require('../../middlewares/upload/profilePhotoUpload');


const postRoute =express.Router();

postRoute.post("/",authMiddleware, PhotoUpload.single('image'),
postImgResize,
createPostCtrl);

postRoute.get('/',fetchPostsCtrl);
postRoute.get('/:id',fetchPostCtrl);

module.exports= postRoute;