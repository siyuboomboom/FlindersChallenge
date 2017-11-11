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
  Button,
  Linking
} from 'react-native';
import { Constants, Permissions, Notifications } from 'expo';
import MapView from 'react-native-maps'
import DeepLinking from 'react-native-deep-linking';
import ActionButton from './components/ActionButton';
import Geofence from 'react-native-expo-geofence';

const morialtaCoor = require( './routes/route1.js');
const loftyCoor = require( './routes/route2.js');
const mylorCoor = require( './routes/route3.js');
const notonCoor = require( './routes/route4.js');
const styles = require('./styles.js');


class morialtaRouteScreen extends Component {

  triggerPoint = [
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

  currentPoint = { latitude : -34.89680   , longitude : 138.69200  };
/*
  getByProximity() {
    navigator.geolocation.getCurrentPosition(
      (data) => {
        const pos = data.coords;
        const result = Geofence.filterByProximity(this.triggerPoint[0], pos, this.state.distance/1000);
        return result;
    });    
  }
*/

  getByProximity() {
        var pos = this.currentPoint;
        var result = Geofence.filterByProximity(this.triggerPoint[0], pos, this.state.distance/1000);
        return result;
  }
  getDistance() {
        var pos = this.currentPoint;
        var distance = Geofence.distanceInKM(this.triggerPoint[0], pos);
        return distance;
  }

  static navigationOptions = {
    title: 'MorialtaRoute',
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
      distance: 200,  //radius of fence in meters
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

  componentWillMount() {
    this.registerForPushNotificationsAsync();
    
/*    Notifications.addListener(() =>{
      this.setState({

      });
    });*/
  }
  
  registerForPushNotificationsAsync = async () => {
    let result = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (Constants.lisDevice && resut.status === 'granted') {
     console.log('Notification permissions granted.')
    }
  }

  localNotification = {
    title: 'Fence 1',
    body: 'Turn left!', // (string) — body text of the notification.
    ios: { // (optional) (object) — notification configuration specific to iOS.
      sound: true // (optional) (boolean) — if true, play a sound. Default: false.
    },
    android: // (optional) (object) — notification configuration specific to Android.
    {
      sound: true, // (optional) (boolean) — if true, play a sound. Default: false.
      //icon (optional) (string) — URL of icon to display in notification drawer.
      //color (optional) (string) — color of the notification icon in notification drawer.
      priority: 'high', // (optional) (min | low | high | max) — android may present notifications according to the priority, for example a high priority notification will likely to be shown as a heads-up notification.
      sticky: false, // (optional) (boolean) — if true, the notification will be sticky and not dismissable by user. The notification must be programmatically dismissed. Default: false.
      vibrate: true // (optional) (boolean or array) — if true, vibrate the device. An array can be supplied to specify the vibration pattern, e.g. - [ 0, 500 ].
      // link (optional) (string) — external link to open when notification is selected.
    }
  };

  render() {

    
    return (
      <View style={styles.container}>
        <ActionButton title="Find me!" onPress={() => this.getAndUpdateLocation()} />
        <ActionButton 
          title="Start!" 
          onPress={() => 
          this.getByProximity() ?
          Notifications.presentLocalNotificationAsync(this.localNotification):
          Notifications.presentLocalNotificationAsync(this.localNotification)
          } 
        />
        {this.getByProximity() ? 
          <Text style={styles.notificationText}> You are in Fence 1! </Text> : 
          <Text style={styles.notificationText}> You are not in Fence 1! </Text>
        }
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

        {this.triggerPoint.map( x => (
          <MapView.Circle
            center={x}
            radius={this.state.distance}
            strokeColor='transparent'
            fillColor="rgba(0, 0, 0, 0.2)"
          />
        ))}
        </MapView>
      </View>
    );
  }
}

class loftyRouteScreen extends Component {
  static navigationOptions = {
    title: 'LoftyRoute',
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
  {loftyCoor.coor.polylines.map(polyline => (
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


class notonRouteScreen extends Component {
  static navigationOptions = {
    title: 'NotonRoute',
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
  {notonCoor.coor.polylines.map(polyline => (
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


class MapsScreen extends React.Component {
  static navigationOptions = {
    title: 'Maps',
  };
  constructor(props) {
    super(props);

  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={ styles.container} >
      <Image source={require('./images/flinders.png')}  style={styles.backgroundImage}>


      <Button style={styles.button}
        title="Go to Morialta Map"
        color='cornflowerblue'
        onPress={() =>
          navigate('morialtaRoute', { name: 'morialta map' })
        }>
      </Button>
      <Button
       title="Go to Mylor Map"
       onPress={() =>
         navigate('mylorRoute', { name: 'mylor map' })
       }
        />
        <Button
       title="Go to Lofty Map"
       onPress={() =>
         navigate('loftyRoute', { name: 'lofty map' })
       }
        />

        <Button
       title="Go to Noton Map"
       onPress={() =>
         navigate('notonRoute', { name: 'noton map' })
       }
        />
        </Image>
      </View>


    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Home',
  };

  constructor(props) {
    super(props);
  }

  componentDidMount(){   
    DeepLinking.addScheme('https://');
    Linking.addEventListener('url', this.handleUrl);
 
    DeepLinking.addRoute('/www.google.com.au', (response) => {
      // example://test 
      this.setState({ response });
    });
 
    Linking.getInitialURL().then((url) => {
      if (url) {
        Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  }

  componentWillUnmount() {
    Linking.removeEventListener('url', this.handleUrl);
  }
 
  handleUrl = ({ url }) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        DeepLinking.evaluateUrl(url);
      }
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={ styles.container} >
      <Image source={require('./images/flinders.png')}  style={styles.backgroundImage}>
      <Button
       title="Login to everyday hero"
       onPress={() =>
       Linking.openURL('https://everydayhero.com/au/sign-in')}
        />
      <Button style={styles.button}
        title="Find your maps"
        color='cornflowerblue'
        onPress={() =>
          navigate('Maps', { name: 'map options' })
        }>
      </Button>
        </Image>
      </View>
    );
  }
}

export const Nav = StackNavigator({
  Home: { screen: HomeScreen },
  Maps: { screen: MapsScreen },
  morialtaRoute:{screen:morialtaRouteScreen},
  loftyRoute:{ screen: loftyRouteScreen},
  mylorRoute: { screen: mylorRouteScreen },
  notonRoute:{screen: notonRouteScreen},

});

export default class App extends Component {
  render() {
    return <Nav />;
  }
}


AppRegistry.registerComponent('App', () => App);