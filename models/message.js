module.exports = function(sequelize, DataTypes) {
  var Message = sequelize.define("Message", {
    name: {
      type: DataTypes.STRING,
      allowNull: true,
      // validate: {
      //   len: [1]
      // }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: true,
      // validate: {
      //   len: [1]
      // }
    },
    rating: {
      type: DataTypes.TEXT,
      allowNull: true,
      // validate: {
      //   len: [1]
      // }
    },
    textbookSale: {
      type: DataTypes.STRING,
      allowNull: true,
      // validate: {
      //   len: [1]
      // }
    },
    textbookBuy: {
      type: DataTypes.STRING,
      allowNull: true,
      // validate: {
      //   len: [1]
      // }
    },
    classid: {
      type: DataTypes.TEXT,
      allowNull: false,
      // validate: {
      //   len: [1]
      // } 
    },
    creator: {
      type: DataTypes.TEXT,
      allowNull: true,
      // validate: {
      //   len: [1]
      // } 
    },

    //This will have to be equal to the id of the class it references, and then we will write code on the front js that will append the messages to wherever this id is the same as their id
  });


  // Message.associate = function (models) {

  //   Message.belongsTo(models.Users, {
  //     foreignKey: 'useridbelongs',
  //     targetKey: 'userid',
  //     constraints: false
  //   });
  
  //   Message.belongsTo(models.Class, {
  //     foreignKey: 'classidbelongs',
  //     targetKey: 'classid',
  //     constraints: false
  //   });


  // }

  

  return Message;
};

  

