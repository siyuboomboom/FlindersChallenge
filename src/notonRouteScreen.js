//class for Route Noton
import React, { Component } from 'react';
import {
  StackNavigator,
} from 'react-navigation';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  Animated,
  Alert
} from 'react-native';
import MapView from 'react-native-maps'
import ActionButton from '../components/ActionButton';
import Geofence from 'react-native-expo-geofence';
import { Constants, Permissions, Notifications } from 'expo';
import timer from 'react-native-timer';

const Coor = require( '../routes/route4.js');
const polylines = Coor.coor.polylines;
const triggerPoint = require( '../triggerPoints/triggerPoint4.js');
const centerPoints = triggerPoint.Points;
const styles = require('../styles.js');
const parameters = require('../triggerPoints/parameters.js');

const radius = parameters.radius;
const locatingInterval = parameters.locatingInterval;
const alertInterval = parameters.alertInterval;

class notonRouteScreen extends Component {

  static navigationOptions = {
    title: 'Noton Route',
  };

  constructor(props) {
    super(props);
    this.region = {
      latitude: polylines[0].coordinates[400].latitude,
      longitude: polylines[0].coordinates[400].longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    };
    this.markers = [{
      latlng:{latitude: -34.928534,
      longitude: 138.599854,},
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
      title:'you are here',
    }];
    this.state = {
      error: null,
      isStarted: false,
    };
  }

  componentDidMount() {
    timer.setInterval("intervalID", this.updatePosition.bind(this), locatingInterval);
  }

  updatePosition() {
    this.watchId = navigator.geolocation.watchPosition(
      (data) => {
        this.markers = [{
          latlng:{latitude: data.coords.latitude,
          longitude: data.coords.longitude,},
          title:'you are here',
        }];
        this.setState({error: null});
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

  handleClick() {
    if(this.state.isStarted) {
      timer.clearInterval("timerInterval");
      this.setState({
        isStarted: false
      });
    }
    else {
      timer.setInterval("timerInterval", this.startJourney.bind(this), 30000); //millisenconds
      this.setState({
        isStarted: true,
      });
    }
  }

  startJourney() {
    const distance = [];

    for (i = 0; i < centerPoints.length; i++) {
      distance[i] = Geofence.distanceInKM(centerPoints[i], this.markers[0].latlng);
    }

    for (i = 0; i < centerPoints.length; i++) {
      if(distance[i] <= radius/1000) {
        Alert.alert("Fence" + (i + 1), centerPoints[i].notification );
      } 
    }    
  }

  onRegionChange(region) {
    this.region = region;
  }

  render() {
    return (
      <View style={styles.container}>
        <ActionButton 
          title={ this.state.isStarted ? "Stop" : "Start" }
          onPress={ this.handleClick.bind(this) } 
        />
        <MapView
          style={styles.map}
          region={this.region}
          onRegionChange={(region) => this.onRegionChange(region)}
        >
          {this.markers.map(marker => (
            <MapView.Marker
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
            />
          ))}
          {polylines.map(polyline => (
            <MapView.Polyline
              key={polyline.id}
              coordinates={polyline.coordinates}
              strokeColor="blue"
              fillColor="red"
              strokeWidth={2}
            />
          ))}
          {centerPoints.map( x => (
            <MapView.Circle
              center={x}
              radius={ radius }
              strokeColor='transparent'
              fillColor="rgba(0, 0, 0, 0.2)"
            />
          ))}
        </MapView>
      </View>
    );
  }
}

module.exports = notonRouteScreen;