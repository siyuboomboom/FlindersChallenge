const morialtaCoor = require( '../routes/route1.js');

var Points = [
    { latitude: morialtaCoor.coor.polylines[0].coordinates[0].latitude,
      longitude: morialtaCoor.coor.polylines[0].coordinates[0].longitude,
      notification: "Fence 1"
    },
    { latitude: morialtaCoor.coor.polylines[0].coordinates[200].latitude,
      longitude: morialtaCoor.coor.polylines[0].coordinates[200].longitude,
      notification: "Fence 2"
    },
    { latitude: morialtaCoor.coor.polylines[0].coordinates[400].latitude,
      longitude: morialtaCoor.coor.polylines[0].coordinates[400].longitude,
      notification: "Fence 3"
    },
    { latitude: morialtaCoor.coor.polylines[0].coordinates[600].latitude,
      longitude: morialtaCoor.coor.polylines[0].coordinates[600].longitude,
      notification: "Fence 4"
    },
  ];

module.exports.Points = Points;
