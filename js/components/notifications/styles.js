/* @flow */
'use strict';

var React = require('react-native');
var { StyleSheet, Dimensions } = React;
var deviceWidth = Dimensions.get('window').width;

module.exports = StyleSheet.create({
    container: {
        flex: 1,
        width: null,
        height: null,
    },
    card: {
      borderWidth: 0
    },
    cardHeader: {
      backgroundColor: 'transparent',
      borderBottomWidth: 0,
      paddingBottom: 10,
      height: 65
    },
    cardItem: {
      backgroundColor: 'transparent',
      paddingTop: 5,
      paddingLeft: 55
    },
    date: {
      textAlign: 'right',
      fontWeight: '100',
      marginTop: -35,
      fontSize: 13
    },
    topTitle: {
      fontFamily: 'PingFangTC-Regular',
      fontSize:18,
      color:'#ff6100',
      letterSpacing:2,
      alignSelf:'center'
    },
    subBlackTxt: {
      fontFamily: 'SFUIDisplay-Regular',
      width:deviceWidth/1.5,
      fontSize:15,
      color:'#4a4a4a',
      letterSpacing:1
    },
    timeTxt: {
      fontFamily: 'SFUIDisplay-Regular',
      fontSize:13,
      color:'#4a4a4a',
      letterSpacing:1
    }
});
