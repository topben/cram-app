/* @flow */
'use strict';

var React = require('react-native');

var { StyleSheet, Dimensions } = React;

var deviceHeight = Dimensions.get('window').height;

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
    },
    roundedButton: {
      alignSelf: 'center',
      marginTop: 25,
      backgroundColor: '#00c497',
      borderRadius:90,
      width: 65,
      height:65
    },
    name: {
      color: 'red'
    },
    camera: {
      height:deviceHeight,
      alignItems: 'center',
    },
    rectangle: {
      height: 250,
      width: 250,
      borderWidth: 2,
      borderColor: '#00FF00',
      backgroundColor: 'transparent',
    },
    rectangleContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent',
    }
});
