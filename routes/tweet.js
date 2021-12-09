module.exports = app => {
  const db = require("../models");
  const User = db.user;
  const Tweet = db.tweet;
  const Op = db.Sequelize.Op;

  const router = require("express").Router();

  // read all tweets list by user id
  router.get("/list/:id", async (req,res)=>{
    try{

      if(!await User.findByPk(req.params.id)){
        return res.json({code:400,error:"User is not exsited"});
      }

      let tweets = await Tweet.findAll({where:{poster_id:req.params.id}});

      return res.json({code:200,data:tweets});

    }catch(e){
      return res.json({code:400,error:e.message});
    }
  });

  // read the tweet by tweet id
  router.get("/:id", async (req,res)=>{
      try{

        if(!await Tweet.findByPk(req.params.id)){
          return res.json({code:400,error:"Tweet id is not existed"});
        }

        let tweet = await Tweet.findOne({where:{id:req.params.id}});

        return res.json({code:200,data:tweet});
      }catch(e){
        return res.json({code:400,error:e.message});
      }
  });

  // create the tweet
  router.post("/create", async (req,res)=>{
    try{

      if(!req.body.poster_id || !req.body.content){
        return res.json({code:400,error:"Poster id or content cannot be null or empty"});
      }

      if(!await User.findByPk(req.body.poster_id)){
        return res.json({code:400,error:"User is not exsited"});
      }

      let tweet = await Tweet.create({poster_id:req.body.poster_id,content:req.body.content});

      return res.json({code:200,data:tweet});

    }catch(e){
      return res.json({code:400,error:e.message});
    }
  });

  // update the tweet
  router.patch("/update/:id", async (req,res)=>{
    try{

      if(!req.body.content || !req.body.user_id){
        return res.json({code:400,error:"Content or user id cannot be empty or null"});
      }

      let tweet = await Tweet.findByPk(req.params.id);

      if(!tweet){
        return res.json({code:400,error:"Tweet is not existed"});
      }

      if(tweet.poster_id !== parseInt(req.body.user_id)){
        return res.json({code:400,error:"You don't have the permission to update the tweet"});
      }

      tweet.content = req.body.content;

      await tweet.save();

      return res.json({code:200,data:tweet});

    }catch(e){
      return res.json({code:400,error:e.message});
    }
  });

  //delete the tweet by tweet id

  router.delete("/delete/:id", async (req,res)=>{
    try{


      let tweet = await Tweet.findByPk(req.params.id);

      if(!tweet){
        return res.json({code:400,error:"Tweet id is not existed"});
      }

      if(tweet.poster_id !== parseInt(req.body.user_id)){
        return res.json({code:400,error:"You don't have the permission to delete the tweet"});
      }

      await tweet.destroy();

      return res.json({code:200,message:"Deleted this tweet"});


    }catch(e){
      return res.json({code:400,error:e.message});
    }
  });


  // like the tweet
  router.post("/like", async (req,res)=>{
    try{

      if(!req.body.tweet_id || !req.body.user_id){
        return res.json({code:400,error:"Poster id or content cannot be null or empty"});
      }

      if(!await User.findByPk(req.body.tweet_id)){
        return res.json({code:400,error:"Tweet id is not exsited"});
      }

      let tweet = await Tweet.findByPk(req.body.tweet_id);

      tweet.like_count++;

      await tweet.save();

      return res.json({code:200,data:tweet});

    }catch(e){
      return res.json({code:400,error:e.message});
    }
  });

  //dislike the tweets
  router.post("/dislike", async (req,res)=>{
    try{

      if(!req.body.tweet_id || !req.body.user_id){
        return res.json({code:400,error:"Poster id or content cannot be null or empty"});
      }

      if(!await User.findByPk(req.body.tweet_id)){
        return res.json({code:400,error:"Tweet id is not exsited"});
      }

      let tweet = await Tweet.findByPk(req.body.tweet_id);

      tweet.unlike_count++;

      await tweet.save();

      return res.json({code:200,data:tweet});

    }catch(e){
      return res.json({code:400,error:e.message});
    }
  });


  router.post("/retweet", async (req,res)=>{
    try{

      if(!req.body.tweet_id || !req.body.user_id){
        return res.json({code:400,error:"Poster id or content cannot be null or empty"});
      }

      if(!await User.findByPk(req.body.tweet_id)){
        return res.json({code:400,error:"Tweet id is not exsited"});
      }

      let tweet = await Tweet.findByPk(req.body.tweet_id);

      tweet.retweet_count++;

      await tweet.save();

      return res.json({code:200,data:tweet});

    }catch(e){
      return res.json({code:400,error:e.message});
    }
  });

   app.use('/api/tweet', router);
};
