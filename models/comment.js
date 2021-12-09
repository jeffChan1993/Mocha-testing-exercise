module.exports = (sequelize, Sequelize) => {
  const Comment = sequelize.define("comment", {
    tweet_id: {
      type: Sequelize.STRING
    },
    content: {
      type: Sequelize.STRING
    ,
    createdBy:{
        type: Sequelize.INTEGER
    }
  });

  return User;
};
