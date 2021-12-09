module.exports = (sequelize, Sequelize) => {
  const Tweet = sequelize.define("tweet", {
    poster_id: {
      type: Sequelize.INTEGER,
      allowNull:false
    },
    content: {
      type: Sequelize.STRING,
      allowNull:false
    },
    img_src:{
      type: Sequelize.STRING,
      allowNull:true
    },
    gif_src:{
      type: Sequelize.STRING,
      allowNull:true
    },
    emoji_src:{
      type: Sequelize.STRING,
        allowNull:true
    },
    like_count:{
      type: Sequelize.INTEGER,
      defaultValue:0
    },
    unlike_count:{
      type: Sequelize.INTEGER,
      defaultValue:0
    },
    retweet_count:{
      type: Sequelize.INTEGER,
      defaultValue:0
    }

  });

  return Tweet;
};
