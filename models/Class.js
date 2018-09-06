module.exports = function(sequelize, DataTypes) {
  var Class = sequelize.define("Class", {
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
    },
    instructor: {
      type: DataTypes.STRING,
      allowNull: true,
      // validate: {
      //   len: [1]
      // }
    },
    courseid: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   len: [1]
      // }
    },
   
  });

  

  // Class.associate = function (models) {
  //   Class.hasMany(models.Message, {as: 'ClassMessages'}); //creates the getClassMessages and setClassMessages functions
  // } 



  

  return Class;
};
