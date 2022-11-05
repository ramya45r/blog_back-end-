const expressAsyncHandler =require("express-async-handler");
const Conversation = require("../../models/conversation/conversation");
const User = require("../../models/user/User");



const createConversationCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const NewConver = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });

    const savedConversation = await NewConver.save();
    res.status(200).send(savedConversation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  });
  
//get
 const  fetchConversation=async(req,res)=>{
  try {
    const conversation = await Conversation.find({
      members: { $in: [req.params.userId] },
    });
    res.status(200).json(conversation);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// conversation partner details

const getPartnerData = async (req, res) => {
  const { friendId } = req.params;
 
   try {
   
     const user = await User.findById( friendId).select("-password");
   res.status(200).json(user)
 
   } catch (error) {
     return res.status(500).json({ message: error.message });
   }
 };
 



module.exports ={ createConversationCtrl, fetchConversation,getPartnerData}
