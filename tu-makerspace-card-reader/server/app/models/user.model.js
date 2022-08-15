const bcrypt = require('bcrypt');
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    name: {
      type: Sequelize.STRING
    },
    id: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    splash: {
      type: Sequelize.BIGINT
    },
    admin: {
      type: Sequelize.BOOLEAN
    },
    fabTech: {
      type: Sequelize.BOOLEAN
    },
    mill: {
      type: Sequelize.BOOLEAN
    },
    lathe: {
      type: Sequelize.BOOLEAN
    },
    waterjet: {
      type: Sequelize.BOOLEAN
    },
    wood1: {
      type: Sequelize.BOOLEAN
    },
    wood2: {
      type: Sequelize.BOOLEAN
    },
    metal1: {
      type: Sequelize.BOOLEAN
    },
    metal2: {
      type: Sequelize.BOOLEAN
    },


  }, {
    hooks: {
      beforeCreate: (user, options) => {
        {
          user.password = user.password && user.password != "" ? bcrypt.hashSync(user.password, 10) : "";
        }
      }
      
    }
  })
  return User;
};