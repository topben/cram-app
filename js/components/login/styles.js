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
    shadow: {
        flex: 1,
        width: null,
        height: null,
        backgroundColor: 'transparent'
    },
    bg: {
        flex: 1,
        marginTop: (deviceHeight/2)-250,
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 70
    },
    mb20: {
      flexDirection:'row',
      alignItems:'center',
      margin: 20,
      borderBottomColor: '#4a4a4a',
      borderBottomWidth: 1
    },
    btn: {
      width:300,
      height:45,
      alignSelf:'center',
      backgroundColor: '#79b4ba',
      margin: 10
    },
    welcomeTxt: {
      fontFamily: 'SFUIDisplay-Ultralight',
      fontSize:36,
      alignSelf:'center',
      color:'#4a4a4a',
      letterSpacing:7,
      paddingTop:30
    },
    registerTxt: {
      fontFamily: 'PingFangTC-Regular',
      color:'#ff6100',
      fontSize: 14,
      marginTop:100
    },
    phoneLoginTxt: {
      fontFamily: 'PingFangTC-Regular',
      color:'#fff',
      alignSelf:'center',
      alignItems:'center',
      fontSize: 15,
    },
    phoneLoginTitle: {
      fontFamily: 'PingFangTC-Ultralight',
      fontSize:36,
      alignSelf:'center',
      color:'#4a4a4a',
      letterSpacing:7,
      paddingTop:50
    },
    phoneBtn: {
      flex:1,
      width:300,
      height:45,
      alignSelf:'center',
      backgroundColor: '#79b4ba',
      margin: 10
    },
    generalChineseTxt: {
      fontFamily: 'PingFangTC-Regular',
      color:'#4a4a4a',
      fontSize: 15
    },
});
