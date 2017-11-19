//class for Route Morialta
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

const morialtaCoor = require( '../routes/route1.js');
const triggerPoint1 = require( '../triggerPoints/triggerPoint1.js');
const centerPoints = triggerPoint1.Points;
const styles = require('../styles.js');

class morialtaRouteScreen extends Component {

  static navigationOptions = {
    title: 'MorialtaRoute',
  };

  currentPoint = { latitude : -34.89680   , longitude : 138.69200  };

  constructor(props) {
    super(props);
    this.state = {
      region: {
        latitude: -34.928534,
        longitude: 138.599854,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      markers:[{
        latlng:{latitude: -34.928534,
        longitude: 138.599854,},
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        title:'you are here',
        description:'you are here',
      }],
      distance: 200,  //Siyu: 200 meters
      error: null,
      isStarted: false,
    }
  }
  /**
   * Ref: https://facebook.github.io/react-native/docs/geolocation.html
   */

  onRegionChange(region) {
    this.setState({ region });
  }
  
  async componentDidMount() {
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (Constants.lisDevice && result.status === 'granted') {
     console.log('Notification permissions granted.')
    } //ask for permissions to send local notification

    this.watchId = navigator.geolocation.watchPosition(
      (data) => {
        this.setState({
          region: {
            latitude: data.coords.latitude,
            longitude: data.coords.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          },
          markers:[{
            latlng:{latitude: data.coords.latitude,
            longitude: data.coords.longitude,},
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
            title:'you are here',
            description:'you are here',
          }],
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );

  }
/*
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }*/



  handleClick() {
    if(this.state.isStarted) {
      timer.clearInterval("timerInterval");
      this.stopJourney();
      this.setState({
        isStarted: false
      });
    }
    else {
      timer.setInterval("timerInterval", this.startJourney.bind(this), 10000); //update per 10s
      this.setState({
        isStarted: true,
      });
    }
  }

  startJourney() {

    const result = [];
    const distance = [];

    for (i = 0; i < centerPoints.length; i++) {
      result[i] = Geofence.filterByProximity(centerPoints[i], this.state.markers[0].latlng, this.state.distance/1000);
      distance[i] = Geofence.distanceInKM(centerPoints[i], this.state.markers[0].latlng);
    }

    for (i = 0; i < centerPoints.length; i++) {

      if(result[i][0]) {

        const localNotification = {
          title: 'Fence ' + (i + 1),
          body: centerPoints[i].notification,
          ios: {
            sound: true
          },
          android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true
          }
        };

        Notifications.presentLocalNotificationAsync(localNotification);
        Alert.alert(centerPoints[i].notification );
      }
      else {
        //Alert.alert("You are not in " + centerPoints[i].notification);
      }
    }
    
  }

  stopJourney() {

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
          region={this.state.region}
          onRegionChange={(region) => this.onRegionChange(region)}
        >
        {this.state.markers.map(marker => (
          <MapView.Marker
          coordinate={marker.latlng}
          title={marker.title}
          description={marker.description}
          />
        ))}
        {morialtaCoor.coor.polylines.map(polyline => (
          <MapView.Polyline
            key={polyline.id}
            coordinates={polyline.coordinates}
            strokeColor="blue"
            fillColor="red"
            strokeWidth={2}
          />
        ))}

        {triggerPoint1.Points.map( x => (
          <MapView.Circle
            center={x}
            radius={ this.state.distance }
            strokeColor='transparent'
            fillColor="rgba(0, 0, 0, 0.2)"
          />
        ))}
        </MapView>
      </View>
    );
  }
}

module.exports = morialtaRouteScreen;