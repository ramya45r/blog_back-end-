const express = require("express");
const {
  userRegisterCtrl,
  loginUserCtl,
  fetchUsersCtrl,
  deleteUsersCtrl,
  fetchUserDetailsCtrl,
  userProfileCtrl,
  updateUserCtrl,
  updateUserPasswordCtrl,
  followingUserCtrl,
  unfollowUserCtrl,
  blockUserCtrl,
  unBlockUserCtrl,
  profilePhotoUploadCtrl,
  
} = require("../../controllers/users/usersCtrl");
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const {
  profilePhotoUpload,profilePhotoResize
} = require("../../middlewares/upload/profilePhotoUpload");

const userRoutes = express.Router();
userRoutes.post("/register", userRegisterCtrl);
userRoutes.post("/login", loginUserCtl);
userRoutes.get("/", fetchUsersCtrl);
userRoutes.get("/profile/:id", authMiddleware, userProfileCtrl);
userRoutes.put("/profile/:id", authMiddleware, updateUserCtrl);

//=======================Follow & Unfollow users==========================================//
userRoutes.put("/follow", authMiddleware, followingUserCtrl);
userRoutes.put("/unfollow", authMiddleware, unfollowUserCtrl);

//=======================Block & Unblock users ===========================================//
userRoutes.put("/block-user/:id", authMiddleware, blockUserCtrl);
userRoutes.put("/unblock-user/:id", authMiddleware, unBlockUserCtrl);

//=======================Unfollow users ===========================================//
userRoutes.put(
  "/profilephoto-upload",
  authMiddleware,
  profilePhotoUpload.single('image'),
  profilePhotoResize,
  profilePhotoUploadCtrl
);

userRoutes.put("/password", authMiddleware, updateUserPasswordCtrl);
userRoutes.delete("/:id", deleteUsersCtrl);
userRoutes.get("/:id", fetchUserDetailsCtrl);

module.exports = userRoutes;
