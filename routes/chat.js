module.exports = app => {
  const db = require("../models");
  const User = db.user;
  const Chat = db.chat;
  const Op = db.Sequelize.Op;

  const router = require("express").Router();

  // get all chat history by id
  router.get("/:id", async (req,res)=>{

    try{

      // find the user record by primary key
      console.log(req.session);
      if(! await User.findByPk(req.params.id)){
        return res.json({code:400,error:"User is not exsited"});
      }

      //get all history even send or receiver by login user
      let historys = await Chat.findAll({where:{
        [Op.or]: [{ sender_id: req.params.id }, { receiver_id: req.params.id }],
      }});

      return res.json({code:200,data:historys});


    }catch(e){
      return res.json({code:400,error:e.message});
    }
  });

  // chat with  other users
  router.post("/send",async(req,res)=>{
    try{
      if(!req.body.sender_id || !req.body.receiver_id){
        return res.json({code:400,error:"Sender or receiver id cannot be null or empty"});
      }

      if(req.body.sender_id === req.body.receiver_id){
        return res.json({code:400,error:"Sender and receiver id cannot equal"});
      }

      if(!req.body.content){
        return res.json({code:400,error:"Content cannot be null or empty"});
      }

      if(! await User.findByPk(req.body.sender_id)){
        return res.json({code:400,error:"Sender is not exsited"});
      }

      if(! await User.findByPk(req.body.receiver_id)){
        return res.json({code:400,error:"Receiver is not exsited"});
      }

      let message = await Chat.create({sender_id:req.body.sender_id,receiver_id:req.body.receiver_id,content:req.body.content});
      return res.json({code:200,data:message});

    }catch(e){
      return res.json({code:400,error:e.message});
    }
  })


    app.use('/api/chat', router);
};
