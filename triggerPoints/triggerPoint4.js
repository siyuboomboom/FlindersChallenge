const Coor = require( '../routes/route4.js');

var Points = [

  { latitude: Coor.coor.polylines[0].coordinates[0].latitude,
    longitude: Coor.coor.polylines[0].coordinates[0].longitude,
    notification: "Fence 1"
  },
  { latitude: Coor.coor.polylines[0].coordinates[200].latitude,
    longitude: Coor.coor.polylines[0].coordinates[200].longitude,
    notification: "Fence 2"
  },
  { latitude: Coor.coor.polylines[0].coordinates[400].latitude,
    longitude: Coor.coor.polylines[0].coordinates[400].longitude,
    notification: "Fence 3"
  },
  { latitude: Coor.coor.polylines[0].coordinates[600].latitude,
    longitude: Coor.coor.polylines[0].coordinates[600].longitude,
    notification: "Fence 4"
  },
];

module.exports.Points = Points;