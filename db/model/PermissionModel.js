const Sequelize = require('sequelize');
const db = require('../context/db');
const User = require("./UserModel");
const Service = require("./ServiceModel");

const Permission = db.define("Permission", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  service_id: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  active: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }
});


// Configuração das relações
User.hasMany(Permission, { foreignKey: "user_id", as: "permission" });
Permission.belongsTo(User, { foreignKey: "user_id", as: "user", onDelete: "CASCADE" });

Service.hasMany(Permission, { foreignKey: "service_id", as: "permission" });
Permission.belongsTo(Service, { foreignKey: "service_id", as: "service", onDelete: "CASCADE" } );


module.exports = Permission;
