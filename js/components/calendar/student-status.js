/*
 * @flow
 */
'use strict';

import React, { Component , PropTypes } from 'react';
import { Image, View } from 'react-native';
import { Text, Container, Content, Button } from 'native-base';
import styles from './styles';

type Props = {
  status_type: string,
  student_id: string,
  class_id: string
};


class LeaveButton extends Component {
    props: Props;
    constructor(props) {
        super(props);
        this.state= {
          isToggled: false
        };
    }

    static propTypes = {
      button_type: PropTypes.string.isRequired,
      student_id: PropTypes.string.isRequired,
      class_id: PropTypes.string.isRequired
    };

    render() {
      switch (this.props.status_type) {
          case 'leave-label':
              return <View/>
          case 'arrive-label':
              return <View/>
          case 'absent-label':
              return <View/>
          case 'leave-button':
              return <Button rounded style={styles.leaveButton}><View><Text style={styles.leaveBtnTxt}>請假</Text></View></Button>;
          default :
              return <View/>;
      }
    }
}


module.exports = LeaveButton;
