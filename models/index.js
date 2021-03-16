const User = require("./User");

const Concerts = require("./Concerts");
// const Location = require("./Location");


Concerts.belongsToMany(Location, {
  // Define the third table needed to store the foreign keys
  through: {
    model: User,
    unique: false,
  },
  // Define an alias for when data is retrieved
  as: "stored_data",
});

// Location.belongsToMany(Concerts, {
//   // Define the third table needed to store the foreign keys
//   through: {
//     model: User,
//     unique: false,
//   },
//   // Define an alias for when data is retrieved
//   as: " ",
// });

module.exports = { Concerts, Location, User };
