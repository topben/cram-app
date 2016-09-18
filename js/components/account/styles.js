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
    bg:{
      height:100,
      backgroundColor:'#ffffff'
    },
    mb20: {
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      borderColor: '#4a4a4a',
      borderBottomWidth: 1,
      marginLeft: deviceWidth/10,
      marginRight: deviceWidth/10,
      paddingTop:50
    },
    card: {
      borderWidth: 0,
      flex: 1,
      flexDirection: 'row'
    },
    topTitle: {
      fontFamily: 'PingFangTC-Regular',
      fontSize:18,
      color:'#ff6100',
      letterSpacing:7,
      alignSelf:'center'
    },
    logOutText: {
      fontFamily: 'PingFangTC-Regular',
      fontSize:18,
      color:'#ff6100',
      letterSpacing:7,
      alignSelf:'center',
      justifyContent:'center'
    },
    subGrayTxt: {
      fontFamily: 'PingFangTC-Regular',
      fontSize:15,
      letterSpacing:2,
      color:'#9b9b9b'
    },
    subBlackTxt: {
      fontFamily: 'SFUIDisplay-Regular',
      fontSize:15,
      color:'#4a4a4a',
      letterSpacing:1
    },
    subOrangeTxt: {
      fontFamily: 'SFUIDisplay-Regular',
      fontSize:15,
      color:'#ff6100',
      letterSpacing:2
    },
    finishBtn: {
      flex:1,
      width:300,
      height:45,
      alignSelf:'center',
      backgroundColor: '#9b9b9b',
      margin: 10,
      marginTop: 100
    },
    row:{
      justifyContent:'space-between',
      height:25,
      marginLeft:20,
      marginRight:20,
      backgroundColor:'#fff'
    }
});
