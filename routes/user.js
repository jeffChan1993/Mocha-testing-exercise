module.exports = app => {
  const db = require("../models");
  const User = db.user;
  const Op = db.Sequelize.Op;

  const router = require("express").Router();

  router.post("/reg", async (req,res)=>{
    try{

      if(!req.body.name || !req.body.password){
        return res.json({code:400,error:"Name or password cannot be null or empty"});
      }

      let user = await User.findOne({where:{name:req.body.name}});

      if(user){
        return res.json({code:400,error:"Name is exsiting, please input other name"});
      }else{
        user = await User.create({name:req.body.name,password:req.body.password});
        return res.json({code:200,data:user});
      }

    }catch(e){
      return res.json({code:400,error:e.message});
    }
  });

  router.post("/login",async(req,res)=>{
    try{
      if(!req.body.name || !req.body.password){
        return res.json({code:400,error:"Name or password cannot be null or empty"});
      }

      let user = await User.findOne({where:{name:req.body.name}});

      if(user){
        return res.json({code:200,data:user});
      }else{
        return res.json({code:400,error:"Wrong name or password, please retry again"});
      }
    }catch(e){
      return res.json({code:400,error:e.message});
    }
  });


   app.use('/api/user', router);
};
