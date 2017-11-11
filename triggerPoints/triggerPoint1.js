const morialtaCoor = require( '../routes/route1.js');

var Points = [
    { latitude: morialtaCoor.coor.polylines[0].coordinates[0].latitude,
      longitude: morialtaCoor.coor.polylines[0].coordinates[0].longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    { latitude: morialtaCoor.coor.polylines[0].coordinates[200].latitude,
      longitude: morialtaCoor.coor.polylines[0].coordinates[200].longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    { latitude: morialtaCoor.coor.polylines[0].coordinates[400].latitude,
      longitude: morialtaCoor.coor.polylines[0].coordinates[400].longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    { latitude: morialtaCoor.coor.polylines[0].coordinates[600].latitude,
      longitude: morialtaCoor.coor.polylines[0].coordinates[600].longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
  ];

module.exports.Points = Points;