module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING,
      validate: {
          is: /^([a-zA-Z0-9]+)$/
      }
    },
    password: {
      type: Sequelize.STRING
    },
    // tag_id:{
    //     type: Sequelize.STRING,
    //     allowNull: true,
    // },
    // birthday:{
    //   type: Sequelize.DATE,
    //   allowNull: true,
    // },
    // phone_number:{
    //   type: Sequelize.INTEGER,
    //   allowNull: true,
    // }
  });


  return User;
};
