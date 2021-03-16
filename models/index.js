const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

User.hasMany(Event, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

Event.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});

module.exports = {
  User,
  Event
};