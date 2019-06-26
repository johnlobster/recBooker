module.exports = function(sequelize, DataTypes) {
  var Booking = sequelize.define("Booking", {
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE
  });

  return Booking;
};

// will have foreign keys for UserId and FacilityId
