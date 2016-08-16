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
    topTitle: {
      fontFamily: 'PingFangTC-Regular',
      fontSize:18,
      color:'#ff6100',
      letterSpacing:3,
      alignSelf:'center'
    },
    listItem: {
      flexDirection:'row',
      justifyContent:'space-around',
      borderBottomWidth:1,
      borderColor:'rgba(181, 181, 181, 0.34)',
      padding:10
    },
    leaveButtonPressed: {
      width:92,
      height:35,
      backgroundColor: '#ff6100',
      alignSelf:'center'
    },
    leaveButtonNormal: {
      width:92,
      height:35,
      backgroundColor: '#f6f3ed',
      borderColor:'#ff6100',
      alignSelf:'center'
    },
    leaveBtnTxtPressed: {
      fontFamily: 'PingFangTC-Regular',
      fontSize: 15,
      color:'white',
    },
    leaveBtnTxtNormal: {
      fontFamily: 'PingFangTC-Regular',
      fontSize: 15,
      color:'#ff6100',
    },
    studentPhoto: {
      width:deviceWidth/10,
      height:deviceWidth/10,
      borderRadius:(deviceWidth/10)/2,
      alignSelf:'center'
    },
    list_student_name: {
      fontFamily: 'PingFangTC-Light',
      color:'rgba(74, 74, 74, 1)',
      fontSize:12,
      alignSelf:'flex-start'
    },
    list_arrived_time: {
      fontFamily: 'SFUIDisplay-Regular',
      color:'rgba(74, 74, 74, 1)',
      fontSize:12,
      alignSelf:'flex-start'
    },
    list_class_name: {
      fontFamily: 'PingFangTC-Light',
      color:'#4a4a4a',
      fontSize:17,
      alignSelf:'flex-start',
      width: deviceWidth/3
    },
    arriveTxtCh: {
      fontFamily: 'PingFangTC-Medium',
      color:'rgba(119, 180, 187, 1)',
      fontSize:14,
      alignSelf:'center'
    },
    arriveTime: {
      fontFamily: 'PingFangTC-Light',
      color:'#77b4bb',
      fontSize:12,
      alignSelf:'center'
    },
    abscenceTxtCh: {
      fontFamily: 'PingFangTC-Medium',
      color:'rgba(255, 85, 0, 1)',
      fontSize:14,
      alignSelf:'center'
    },
    leaveTxtCh: {
      fontFamily: 'PingFangTC-Medium',
      color:'rgba(74, 74, 74, 1)',
      fontSize:14,
      alignSelf:'center'
    },
    scroll:{
      height: deviceHeight/2 - 20
    }
});
