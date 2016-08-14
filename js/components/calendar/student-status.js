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

    onButtonPressed() {
      switch (this.props.status_type) {
          case 'leave-label':
              break;
          case 'arrive-label':
              break;
          case 'absent-label':
              break;
          case 'leave-button':
          if(!this.state.isToggled)
          {
            this.setState({ isToggled: true });
          }
          else
          {
            this.setState({ isToggled: false });
          }
              break;
          default :
              break;
      }
    }

    render() {
      switch (this.props.status_type) {
          case 'leave-label':
              return <View style={{alignSelf:'center'}}><Text style={styles.leaveTxtCh}>請假</Text></View>
          case 'arrive-label':
              return <View style={{alignSelf:'center',flexDirection:'column'}}><Text style={styles.arriveTxtCh}>抵達</Text><Text style={styles.arriveTime}>12:00</Text></View>
          case 'absent-label':
              return <View style={{alignSelf:'center'}}><Text style={styles.leaveTxtCh}>未到</Text></View>
          case 'leave-button':
          return <Button
            rounded
            style={(this.state.isToggled)?styles.leaveButtonPressed:styles.leaveButtonNormal}
            onPress={() => this.onButtonPressed()}>
            <View>
              <Text style={(this.state.isToggled)?styles.leaveBtnTxtPressed:styles.leaveBtnTxtNormal}>請假</Text>
            </View>
          </Button>;
          default :
              return <View/>;
      }
    }
}


module.exports = LeaveButton;
