module.exports = function(sequelize, DataTypes) {
  let User = sequelize.define("User", {
    name: DataTypes.STRING
  });

  User.associate = function(models) {
    // each user has many bookings
    models.User.hasMany(models.Booking);
  };
  return User;
};

// potential new fields
// password
// Phone number
// Email
