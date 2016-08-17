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
      marginTop: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    markerBottom:{
      marginBottom:30,
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between'
    },
    markerTopLeft:{
      marginLeft:30,
      transform: [{rotate: '0deg'}],
    },
    markerTopRight:{
      marginRight:30,
      transform: [{rotate: '90deg'}],
    },
    markerBottomLeft:{
      marginLeft:30,
      transform: [{rotate: '270deg'}],
    },
    markerBottomRight:{
      marginRight:30,
      transform: [{rotate: '180deg'}],
    },
    student_modal: {
      height: (deviceHeight/2)-78,
      width: deviceWidth-40,
      // marginTop: (deviceHeight/2)+78,
      // height: deviceHeight-78,
      // position: 'relative',
       justifyContent: 'center',
       backgroundColor: 'transparent'
    },
    class_modal: {
      height: (deviceHeight/2)-78,
      width: deviceWidth-40,
      // marginTop: (deviceHeight/2)+78,
      // height: deviceHeight-78,
      // position: 'relative',
       justifyContent: 'center',
       backgroundColor: 'transparent'
    },
    student_card_white: {
      backgroundColor:'#fff',
      width:deviceWidth-40,
      alignSelf: 'center',
    },
    student_card_gray: {
      opacity:1,
      width:deviceWidth-40,
      height:30,
      alignSelf: 'center',
    },
    space: {
      backgroundColor:'#fff',
      width:deviceWidth-40
    },
    overlay: {
      width:deviceWidth,
      backgroundColor:'#f5f6f7',
      alignSelf:'center',
      //marginTop:70
    },
    modalTitleCh: {
      fontFamily: 'PingFangTC-Regular',
      color:'#4a4a4a',
      fontSize:25,
      alignSelf:'center',
      paddingTop:20,
      letterSpacing:1
    },
    newModaltxt: {
      fontFamily: 'PingFangTC-Regular',
      color:'#fff',
      alignSelf:'center',
      marginBottom: 2
    },
    btnTxtCh: {
      fontFamily: 'PingFangTC-Regular',
      color:'#ff6100',
      fontSize:20,
      alignSelf:'center'
    },
    arriveTxtCh: {
      fontFamily: 'PingFangTC-Medium',
      color:'#77b4bb',
      fontSize:18,
      alignSelf:'center'
    },
    abscenceTxtCh: {
      fontFamily: 'PingFangTC-Medium',
      color:'#4a4a4a',
      fontSize:18,
      alignSelf:'center'
    },
    leaveTxtCh: {
      fontFamily: 'PingFangTC-Medium',
      color:'#ff6100',
      fontSize:18,
      alignSelf:'center'
    },
    arriveNum: {
      fontFamily: 'PingFangTC-Medium',
      color:'#77b4bb',
      fontSize:15,
      alignSelf:'center'
    },
    abscenceNum: {
      fontFamily: 'PingFangTC-Medium',
      color:'#4a4a4a',
      fontSize:15,
      alignSelf:'center'
    },
    leaveNum: {
      fontFamily: 'PingFangTC-Medium',
      color:'#ff6100',
      fontSize:15,
      alignSelf:'center'
    },
    subtitle: {
      fontFamily: 'PingFangTC-Medium',
      color:'#4a4a4a',
      fontSize:15,
      alignSelf:'center',
      letterSpacing:1
    },
    btn: {
      width:300,
      height:45,
      marginTop:20,
      alignSelf:'center',
      backgroundColor: '#f6f3ed',
      borderColor:'#ff6100',
      borderWidth: 1
    },
    gridStyle: {
      width:deviceWidth - 40,
      height:500,
      alignSelf:'center',
      backgroundColor: '#fff'
    },
    overlayAbsence: {
      fontFamily: 'PingFangTC-Regular',
      color:'#ff6100',
      fontSize:20,
      alignSelf:'center',
      paddingTop:30,
      paddingBottom:30
    },
    overlayRow:{
      flexDirection:'column',
      marginTop:10
    },
    overlayColumn:{
      alignSelf:'flex-start'
    },
    overlayThumb:{
      width:70,
      height:70,
      borderRadius:35,
      alignSelf:'center'
    },
    studentModalName: {
      fontFamily: 'PingFangTC-Light',
      color:'#4a4a4a',
      fontSize:25,
      paddingLeft:20,
      paddingTop:20,
      alignSelf:'center',
    },
    studentModalStatus: {
      fontFamily: 'PingFangTC-Medium',
      color:'#77b4bb',
      fontSize:17,
      alignSelf:'center',
      paddingLeft:20,
      paddingTop:50
    },
    studentModalArrivalTime: {
      fontFamily: 'SFUIDisplay-Medium',
      color:'#77b4bb',
      fontSize:17,
      alignSelf:'center',
      paddingLeft:20
    },
    circleAvatar: {
      alignSelf: 'center',
      marginLeft:20,
      marginTop: 20,
      marginBottom: 15,
      resizeMode: 'contain'
    },
    studentPhoto: {
      width:deviceWidth/10,
      height:deviceWidth/10,
      borderRadius:(deviceWidth/10)/2,
      alignSelf:'center'
    },
    processing: {
      alignSelf: 'center',
      paddingTop: deviceHeight/2 -100
    }
});
