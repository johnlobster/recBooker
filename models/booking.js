module.exports = function(sequelize, DataTypes) {
  var Booking = sequelize.define("Booking", {
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE
  });

  Booking.associate = function(models) {
    models.Booking.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

    models.Booking.belongsTo(models.Facility, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Booking;
};

// will have foreign keys for UserId and FacilityId
