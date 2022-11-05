const express =require('express');
const {createMessageCtrl, fetchMessage } = require('../../controllers/message/message');
const messageRoute =express.Router();

messageRoute.post('/',createMessageCtrl);
messageRoute.get('/:conversationId',fetchMessage);



module.exports =messageRoute;