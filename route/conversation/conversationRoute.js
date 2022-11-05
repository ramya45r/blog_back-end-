const express =require('express');
const { createConversationCtrl , fetchConversation,getPartnerData} = require('../../controllers/conversation/conversation');

const conversationRoute =express.Router();

conversationRoute.post('/',createConversationCtrl);

conversationRoute.get('/:userId', fetchConversation);
conversationRoute.get("/Data/:friendId", getPartnerData);
module.exports =conversationRoute;