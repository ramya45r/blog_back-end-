const expressAsyncHandler =require("express-async-handler");
const Message = require("../../models/message/message");
//create a new message

const createMessageCtrl = expressAsyncHandler(async (req, res) => {
   const newMessage =new Message(req.body)
   try{
    const savedMessage =await newMessage.save();
    res.status(200).json(savedMessage)
   }catch(err){
    res.status(500).json(err)
   }
    });
//get message
//get
const  fetchMessage=expressAsyncHandler(async(req,res)=>{
    try{
     const messages =await Message.find({
     conversationId:req.params.conversationId
     });
     res.status(200).json(messages);
    }catch(err){
     res.json(500).json(err);
    }
   })
  

module.exports ={createMessageCtrl, fetchMessage}
