//class for Mylor Route
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
import DeepLinking from 'react-native-deep-linking';
import ActionButton from '../components/ActionButton';
import Geofence from 'react-native-expo-geofence';
import { Constants, Permissions, Notifications } from 'expo';
import { Button } from 'react-native-elements';
import { Icons } from 'react-native-elements';

const mylorCoor = require( '../routes/route3.js');
const styles = require('../styles.js');

class mylorRouteScreen extends Component {
  static navigationOptions = {
    title: 'MylorRoute',
  };

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

  }
}
  /**
   * Ref: https://facebook.github.io/react-native/docs/geolocation.html
   */
  getAndUpdateLocation() {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        const region = {
          latitude: data.coords.latitude,
          longitude: data.coords.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        };
        const marker = [{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          title:'you are here',
          description:'you are here',
        }];
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

        });
      },
      (err) => {
        console.log('err', err);
      },
      {}
    );
  }

  onRegionChange(region) {
    this.setState({ region });
  }

  render() {
    return (
      <View style={styles.container}>
        <ActionButton title="Find me!" onPress={() => this.getAndUpdateLocation()} />
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
        {mylorCoor.coor.polylines.map(polyline => (
        <MapView.Polyline
          key={polyline.id}
          coordinates={polyline.coordinates}
          strokeColor="blue"
          fillColor="red"
          strokeWidth={2}
          />
        ))}
        </MapView>
      </View>
    );
  }
}

module.exports = mylorRouteScreen;