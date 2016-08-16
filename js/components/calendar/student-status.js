/*
 * @flow
 */
'use strict';

import React, { Component , PropTypes } from 'react';
import { Image, View } from 'react-native';
import { Text, Container, Content, Button } from 'native-base';
import styles from './styles';


import global_variables from '../../global_variables';
const Realm = require('realm');
import realm_schema from '../../realm_schema';
const {Debug} = require('NativeModules');
const {Parent} = require('NativeModules');



type Props = {
  isToggled: bool,
  status_type: string,
  student_id: string,
  klass_id: string
};


class LeaveButton extends Component {
    props: Props;
    constructor(props) {
        super(props);
        this.state= {
          isToggled: this.props.isToggled
        };
    }

    static propTypes = {
      button_type: PropTypes.string.isRequired,
      student_id: PropTypes.string.isRequired,
      klass_id: PropTypes.string.isRequired,
      isToggled: PropTypes.bool.isRequired
    };

    onButtonPressed() {
      switch (this.props.status_type) {
          case 'leave':
              break;
          case 'arrived':
              break;
          case 'late':
              break;
          case 'leave-button':
              if(!this.state.isToggled){

                let realm = new Realm({schema: realm_schema});
                // get user access token
                var users = realm.objects('UserModel').sorted('i_login_at', true);
                var access_token = users[users.length-1].s_access_token;

                var uuid = '';
                var $this = this;

                if( typeof realm.objects('AttendanceModel').filtered('s_student_id = "' + this.props.student_id + '" AND s_klass_id = "' + this.props.klass_id + '"')[0] != 'undefined')
                {
                  uuid = realm.objects('AttendanceModel').filtered('s_student_id = "' + this.props.student_id + '" AND s_klass_id = "' + this.props.klass_id + '"')[0].s_attendance_id;
                }
                else
                {
                  return;
                }


                Parent.dontTakeDayOff(global_variables.HOST + '/api/v1/attendances/' + uuid + '?access_token=' + access_token,
                  function successCallback(results) {
                    let realm = new Realm({schema: realm_schema});
                    var $attendanceModel = {};
                    if(typeof realm.objects('AttendanceModel').filtered('s_student_id = "' + $this.props.student_id + '" AND s_klass_id = "' + $this.props.klass_id + '"')[0] != 'undefined')
                    {
                      $attendanceModel = realm.objects('AttendanceModel').filtered('s_student_id = "' + $this.props.student_id + '" AND s_klass_id = "' + $this.props.klass_id + '"')[0];
                      realm.write(() =>
                      {
                        realm.delete($attendanceModel);
                      });
                    }
                    else
                    {
                        return;
                    }
                  },
                  function errorCallback(results) {
                    alert(results.msg);
                  });
                this.setState({ isToggled: true });
              }
              else{
                let realm = new Realm({schema: realm_schema});
                // get user access token
                var users = realm.objects('UserModel').sorted('i_login_at', true);
                var access_token = users[users.length-1].s_access_token;

                Parent.takeDayOff(this.props.student_id, this.props.klass_id, global_variables.HOST + '/api/v1/attendances/leave?access_token=' + access_token,
                  function successCallback(results) {
                  },
                  function errorCallback(results) {
                    alert(results.msg);
                  });
                this.setState({ isToggled: false });
              }
              break;
          default :
              break;
      }
    }

    render() {
      switch (this.props.status_type) {
          case 'leave':
              return <View style={{alignSelf:'center'}}><Text style={styles.leaveTxtCh}>請假</Text></View>
          case 'arrived':
          console.log('arrived..');
              return <View style={{alignSelf:'center',flexDirection:'column'}}><Text style={styles.arriveTxtCh}>抵達</Text><Text style={styles.arriveTime}>12:00</Text></View>
          case 'absent':
              return <View style={{alignSelf:'center'}}><Text style={styles.leaveTxtCh}>未到</Text></View>
          case 'leave-button':
          return <Button
            rounded
            style={(this.state.isToggled)?styles.leaveButtonPressed:styles.leaveButtonNormal}
            onPress={() => this.onButtonPressed()}>
            <View>
              <Text style={(this.state.isToggled)?styles.leaveBtnTxtPressed:styles.leaveBtnTxtNormal}>{(this.state.isToggled)?'請假':'取消請假'}</Text>
            </View>
          </Button>;
          default :
              return <View/>;
      }
    }
}


module.exports = LeaveButton;
