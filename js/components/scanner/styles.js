/* @flow */
'use strict';

var React = require('react-native');

var { StyleSheet, Dimensions } = React;

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
    container: {
        flex:1,
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
    },
    rectangle: {
      height: 250,
      width: 250,
      borderWidth: 2,
      borderColor: '#00FF00',
      backgroundColor: 'transparent',
    },
    rectangleContainer: {
      flex:1,
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: 'transparent',
    },
    markerTop:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    markerBottom:{
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    markerTopLeft:{
      transform: [{rotate: '0deg'}],
    },
    markerTopRight:{
      transform: [{rotate: '90deg'}],
    },
    markerBottomLeft:{
      transform: [{rotate: '270deg'}],
    },
    markerBottomRight:{
      transform: [{rotate: '180deg'}],
    },
    modal: {
      height: (deviceHeight/2)-78,
      width: deviceWidth-40,
      // marginTop: (deviceHeight/2)+78,
      // height: deviceHeight-78,
      // position: 'relative',
       justifyContent: 'center',
       backgroundColor: 'transparent'
    },
    space: {
      marginTop: 10,
      marginBottom: 10,
      alignSelf: 'center'
    },
    overlay: {
      height:deviceHeight,
      width:deviceWidth-40,
      backgroundColor:'#fff',
      alignSelf:'center',
      marginTop:70
    }
});
