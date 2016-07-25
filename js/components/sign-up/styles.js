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
    mb20: {
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      borderColor: '#4a4a4a',
      borderBottomWidth: 1,
      marginLeft: deviceWidth/10,
      marginRight: deviceWidth/10
    },
    bg: {
        flex: 1,
        marginTop: (deviceHeight/2)-220,
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 70
    },
    newAccountTxt: {
      fontFamily: 'PingFangTC-Ultralight',
      fontSize:36,
      alignSelf:'center',
      color:'#4a4a4a',
      letterSpacing:7
    },
    verifyTxt: {
      fontFamily: 'PingFangTC-Regular',
      color:'#fff',
      alignSelf:'center',
      alignItems:'center',
      fontSize: 15,
      marginBottom:10
    },
    getVerifyBtn: {
      flex:1,
      width:300,
      height:45,
      alignSelf:'center',
      backgroundColor: '#9b9b9b',
      margin: 10
    },
});
