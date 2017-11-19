/*
Contributor: Yulin Zhou, Wenchi Tseng, Siyu Tan
*/
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
import DeepLinking from 'react-native-deep-linking';
import { Button } from 'react-native-elements';

import morialtaRouteScreen from './src/morialtaRouteScreen.js';
import loftyRouteScreen from './src/loftyRouteScreen.js';
import mylorRouteScreen from './src/mylorRouteScreen.js';
import notonRouteScreen from './src/notonRouteScreen.js';

const styles = require('./styles.js');

//class for the map menu screen
class MapsScreen extends React.Component {
  static navigationOptions = {
    title: 'Your Challenge',
  };
  constructor(props) {
    super(props);

  }
//render the view
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <View style={ styles.bg }>
          <Image source={require('./images/pic4.png')} style={styles.img} >
            <Button style={styles.button}
              backgroundColor = '#008B8B'
              underlayColor = 'transparent'
              fontWeight = 'bold'
              borderRadius = { 3 }
              title="Morialta Map >"
              onPress={() => navigate('morialtaRoute', { name: 'morialta map' })
              }>
            </Button>
        </Image>
        </View>
        <View style={styles.bg}>
          <Image source={require('./images/pic5.png')} style={styles.img}>
            <Button style={styles.button}
              backgroundColor = '#eb983f'
              underlayColor = 'transparent'
              fontWeight = 'bold'
              borderRadius = { 3 }
              title="Mylor Map >"
              onPress={() => navigate('mylorRoute', { name: 'mylor map' })
              }>
            </Button>
          </Image>
        </View>
        <View style={styles.bg}>
          <Image source={require('./images/pic3.png')} style={styles.img}>
            <Button style={styles.button}
             backgroundColor = '#118ab2'
             underlayColor = 'transparent'
             fontWeight = 'bold'
             borderRadius = { 3 }
             title="Lofty Map >"
             onPress={() => navigate('loftyRoute', { name: 'lofty map' })
             }>
            </Button>
          </Image>
        </View>
        <View style={styles.bg}>
          <Image source={require('./images/pic6.png')} style={styles.img}>
            <Button style={styles.button}
              backgroundColor = '#9b9b9b'
              borderRadius = { 3 }
              fontWeight = 'bold'
              title="Noton Map >"
              underlayColor = 'transparent'
              onPress={() => navigate('notonRoute', { name: 'noton map' })
              }>
           </Button>
         </Image>
        </View>
      </View>
    );
  }
}
/*
ref: https://facebook.github.io/react-native/docs/animations.html#interpolation
*/
//class for special effect displayed in homepage
class FadeInView extends React.Component {
  state = {
    fadeAnim: new Animated.Value(0),
  }
//set the timing
  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      {
        toValue: 1,
        duration: 3000,
      }
    ).start();
  }

  render() {
    let { fadeAnim } = this.state;

    return (
      <Animated.View
        style={{
          opacity: fadeAnim,
        }}
      >
      {this.props.children}
      </Animated.View>
    );
  }
}
//class for home page
class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  constructor(props) {
    super(props);

  }
//external linking to Everydayhero website(The organization does not own its own App yet)
  componentDidMount(){   
     DeepLinking.addScheme('https://');
    Linking.addEventListener('url', this.handleUrl);
 
    DeepLinking.addRoute('/www.google.com.au', (response) => {
      // example://test 
      this.setState({ response });
    });
 
    Linking.getInitialURL().then((url) => {
      if (url) {
        Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));}

  componentWillUnmount() {
      Linking.removeEventListener('url', this.handleUrl);
    }
 
  handleUrl = ({ url }) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        DeepLinking.evaluateUrl(url);
      }
    });
  }


  render() {
    const { navigate } = this.props.navigation;

    return (
        <View style={styles.home}>
          <Image style={styles.absolute}
            source={require('./images/home.png')}
            blurRadius={ 4 }
          />
            <FadeInView style={styles.aniview}>
              <Text style={styles.text}>Your Journey</Text>
              <Text style={styles.text}>Starts Here</Text>
            </FadeInView>
            <Button
              style={styles.homebutton }
              title='To Everydayhero'
              backgroundColor= '#20B2AA'
              borderRadius= { 70 }
              fontSize= '18'
              fontWeight = '500'
              underlayColor = 'transparent'
              onPress={() => Linking.openURL('https://everydayhero.com/au/sign-in')}
            />
            <Button
              style={styles.homebutton }
              borderRadius={ 70 }
              title="Our Maps"
              fontSize= '18'
              fontWeight = '500'
              backgroundColor= '#2F4F4F'
              underlayColor = 'transparent'
              onPress={() => navigate('Maps', { name: 'map options' })}
            />
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
