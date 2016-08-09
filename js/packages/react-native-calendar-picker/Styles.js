/**
* Calendar Picker Component
* By Stephani Alves - April 11, 2015
/* @flow */
'use strict';

var React = require('react-native');

var { StyleSheet, Dimensions } = React;

var deviceWidth = Dimensions.get('window').width;

var styles = StyleSheet.create({
    calendar: {
        height: 280,
        marginTop: 5
    },
    dayWrapper: {
        width: (deviceWidth-40)/7,
        height: 35,
        backgroundColor: 'rgba(0,0,0,0.0)'
    },

    dayButton: {
        width: 40,
        height: 35,
        alignSelf: 'center'
    },

    dayButtonSelected: {
        width: 28,
        height: 28,
        borderRadius: 14,
        backgroundColor: '#ff6100',
        alignSelf: 'center'
    },

    dayLabel: {
        fontSize: 14,
        fontFamily: 'SFUIDisplay-Regular',
        color:'#4a4a4a',
        marginTop: 6,
        alignSelf: 'center'
    },

    seletctedDayLabel: {
        fontSize: 14,
        fontFamily: 'SFUIDisplay-Regular',
        color:'#fff',
        marginTop: 6,
        alignSelf: 'center'
    },

    dayLabelsWrapper: {
        width: deviceWidth-40,
        flexDirection: 'row',
        justifyContent:'space-between',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        alignSelf: 'center',
        backgroundColor: '#f5f6f7',
        borderColor: '#f5f6f7'
    },

    daysWrapper: {
        alignSelf: 'center',
    },

    dayLabels: {
      fontFamily: 'SFUIDisplay-Regular',
      color:'#4a4a4a',
      width: 45,
      fontSize: 16,
      textAlign: 'center'
    },

    selectedDay: {
        width: 60,
        height:60,
        backgroundColor: '#ff6100',
        borderRadius: 30,
        alignSelf: 'center'
    },

    monthLabel: {
        fontSize: 16,
        fontFamily: 'PingFangTC-Regular',
        color:'#4a4a4a',
        width: 180,
        textAlign: 'center'
    },

    headerWrapper: {
        alignItems: 'center',
        flexDirection: 'row',
        alignSelf: 'center',
        padding: 5,
        backgroundColor: 'rgba(0,0,0,0.0)'
    },

    monthSelector: {
        width: 60,
    },

    prev: {
        textAlign: 'left',
        fontFamily: 'SFUIDisplay-Regular',
        color:'#4a4a4a'
    },

    next: {
        textAlign: 'right',
        fontFamily: 'SFUIDisplay-Regular',
        color:'#4a4a4a'
    },

    yearLabel: {
        fontSize: 14,
        fontWeight: 'bold',
        fontFamily: 'SFUIDisplay-Regular',
        color:'#4a4a4a',
        textAlign: 'center'
    },

    weeks: {
        flexDirection: 'column'
    },

    weekRow: {
        flexDirection: 'row'
    }
});

module.exports = styles;
