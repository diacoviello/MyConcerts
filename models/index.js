const User = require("./User");
const Event = require("./Event");


User.hasMany(Event, {
  foreignKey: 'userID',
  onDelete: 'CASCADE'
});

Event.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
})


module.exports = {
  User,
  Event,
};
