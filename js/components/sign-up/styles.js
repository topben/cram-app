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
      flexDirection:'row',
      alignSelf:'center',
      justifyContent:'center',
      borderColor: '#4a4a4a',
      borderBottomWidth: 1,
      marginLeft: deviceWidth/15,
      marginRight: deviceWidth/15
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
      fontSize: 15
    },
    limitationTxt: {
      fontFamily: 'PingFangTC-Regular',
      color:'rgba(155, 155, 155, 1)',
      alignSelf:'flex-start',
      fontSize: 14,
      letterSpacing: 3
    },
    getVerifyBtn: {
      flex:1,
      width:deviceWidth/2,
      alignSelf:'center',
      backgroundColor: '#77b4bb',
      margin: 10
    },
    verifyPwd:{
      fontFamily: 'PingFangTC-Medium',
      color:'#77b4bb',
      alignSelf:'center',
      alignItems:'center',
      fontSize: 17,
      paddingTop:20
    },
    checkPwd:{
      fontFamily: 'PingFangTC-Medium',
      color:'#ff6100',
      alignSelf:'center',
      alignItems:'center',
      fontSize: 17,
      paddingTop:20
    }
});
