import { Dimensions } from 'react-native'

const React = require('react-native')
const {StyleSheet} = React
const constants = {
  actionColor: '#24CE84'
};

const styles = StyleSheet.create({
  map: {
    flex:1
  },
  container: {
    backgroundColor: '#f2f2f2',
    flex: 1,
  },
  aniview: {
    paddingTop: 300,
  },
  text: {
    color: 'white',
    fontSize: 35,
    textAlign: 'center',
    margin: 10,
    lineHeight: 50,
    backgroundColor: 'transparent',
    fontWeight: 'bold',
    fontFamily: 'Futura',
    textShadowColor: 'rgba(0, 0, 0, 0.70)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  home: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',

	},
  homebutton: {
    width: '40%',
    height: 40,
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  bg: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1.25,
    alignItems: 'center',
    height: 126,
  },
  img: {
    flex: 1,
    alignSelf: 'stretch',
    width: null,
  },
  listview: {
    flex: 1,
  },
  button: {
    width: 123,
    height: 50
  },
  homebutton: {
    width: 225,
    height: 50
  },
  li: {
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 14,
    paddingBottom: 16,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  liContainer: {
    flex: 2,
  },
  liText: {
    color: '#333',
    fontSize: 16,
  },
  navbar: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomColor: '#eee',
    borderColor: 'transparent',
    borderWidth: 1,
    justifyContent: 'center',
    height: 44,
    flexDirection: 'row'
  },
  navbarTitle: {
    color: '#444',
    fontSize: 16,
    fontWeight: "500"
  },
  center: {
    textAlign: 'center',
  },
  actionText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  action: {
    backgroundColor: constants.actionColor,
    borderColor: 'transparent',
    borderWidth: 1,
    paddingLeft: 16,
    paddingTop: 14,
    paddingBottom: 16,
  },
  notificationText: {
    textAlign: 'center',
    color: '#000',
    fontSize: 25,
  },
  markerWrap: {
    alignItems: "center",
    justifyContent: "center",
  },
  marker: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "rgba(65, 132, 244, 0.9)",
  },
  ring: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255, 0.9)",
    position: "absolute",
    borderWidth: 1,
    borderColor: "rgba(255,255,255, 0.9)",
  },
})

module.exports = styles
module.exports.constants = constants;
