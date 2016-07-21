/* @flow */
'use strict';

import { StyleSheet } from "react-native";

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
    }
});
