module.exports = (sequelize, Sequelize) => {
  const Chat = sequelize.define("chat", {
    sender_id: {
      type: Sequelize.INTEGER
    },
    receiver_id: {
      type: Sequelize.INTEGER
    },
    content: {
      type: Sequelize.TEXT,
      allowNull:false
    }
  });

  return Chat;
};
