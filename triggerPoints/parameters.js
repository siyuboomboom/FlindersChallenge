//Radius of fence in meters
var radius = 25; 
//How often to update the location in milliseconds
var locatingInterval = 15000;
//How often to check if the location is in the fence and trigger alerts in milliseconds
var alertInterval = 30000;

module.exports.radius = radius;
module.exports.locatingInterval = locatingInterval;
module.exports.alertInterval = alertInterval;