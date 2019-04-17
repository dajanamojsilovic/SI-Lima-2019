const Sequelize = require("sequelize");
module.exports = function(sequelize,DataTypes){
const odsjek = sequelize.define("Odsjek",{
nazivOdsjeka:Sequelize.STRING
},
{freezeTableName:true,
timestamps:false}
)
return odsjek;
};
