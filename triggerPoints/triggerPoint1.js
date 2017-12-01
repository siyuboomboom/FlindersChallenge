const Coor = require( '../routes/route1.js');

var Points = [
    { latitude: -34.9285517,
      longitude: 138.5994846,
      notification: "first point"
    },  
    { latitude: -34.9286168,
      longitude: 138.5983473,
      notification: "sencond point"
    },
    { latitude: -34.9286696,
      longitude: 138.5978666,
      notification: "third point"
    },
    { latitude: -34.9287598,
      longitude: 138.5970086,
      notification: "fourth point"
    },
    { latitude: -34.9270224,
      longitude: 138.5941046,
      notification: "home"
    },
    { latitude: -34.9285,
      longitude: 138.6007,
      notification: "CMU"
    },
    { latitude: -34.92586,
      longitude: 138.59983,
      notification: "King William Street"
    },
    { latitude: -34.92728,
      longitude: 138.60003,
      notification: "Victoria Square"
    },
    { latitude: -34.9279431,
      longitude: 138.6012572,
      notification: "CMUA"
    },
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
