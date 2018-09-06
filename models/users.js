module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   len: [1]
      // }
    },
    userid: {
      type: DataTypes.TEXT,
      allowNull: false,
      // validate: {
      //   len: [1]
      // }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });

  // Users.associate = function (models) {
  //   Users.hasMany(models.Message, {as: 'UserMessages'}); //creates the getUserMessages and setUserMessages functions
  // }


  
  return Users;
};
