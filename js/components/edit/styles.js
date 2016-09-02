/* @flow */
'use strict';

var React = require('react-native');
var { StyleSheet, Dimensions } = React;

var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
    },
    mb20:{
      flexDirection:'row',
      alignItems:'center',
      margin: 20,
      borderBottomColor: '#4a4a4a',
      borderBottomWidth: 1
    },
    card: {
      borderWidth: 0,
      flex: 1,
      flexDirection: 'row'
    },
    mainTitle: {
      fontFamily: 'PingFangTC-Ultralight',
      fontSize:36,
      alignSelf:'center',
      color:'#4a4a4a',
      letterSpacing:7
    },
    emailTxt: {
      fontFamily: 'PingFangTC-Regular',
      color:'#fff',
      alignSelf:'center',
      alignItems:'center',
      fontSize: 15
    },
    finishBtn: {
      flex:1,
      width:300,
      height:45,
      alignSelf:'center',
      backgroundColor: '#77b4bb',
      margin: 10,
    },
});
