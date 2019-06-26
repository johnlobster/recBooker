module.exports = function(sequelize, DataTypes) {
  var Facility = sequelize.define("Facility", {
    name: DataTypes.STRING
  });

  Facility.associate = function(models) {
    // each facility has many bookings
    models.Facility.hasMany(models.Booking, {});
  };
  return Facility;
};

// potential new fields
// Address
// Availability time
// geolocation
// image
