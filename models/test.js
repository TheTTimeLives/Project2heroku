module.exports = function(sequelize, DataTypes) {
  var Test = sequelize.define("Test", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   len: [1]
      // }
    },
    subject: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   len: [1]
      // }
    }
  });

  // Class.associate = function (models) {
  //   Class.hasMany(models.Message, {as: 'ClassMessages'}); //creates the getClassMessages and setClassMessages functions
  // } 



  

  return Test;
};
