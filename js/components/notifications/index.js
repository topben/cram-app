/**
 * Created by kylefang on 4/28/16.
 * @flow
 */

'use strict';
//Currently using it as playground

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {openDrawer} from '../../actions/drawer';
import {popRoute,replaceRoute} from '../../actions/route';
// import CodePush from 'react-native-code-push';
import { Image, View, ScrollView } from 'react-native';
import {Container, Header, Title, Content, Text, Button, Icon, List, ListItem, Badge} from 'native-base';
import global_variables from '../../global_variables';
import realm_schema from '../../realm_schema';

import theme from '../../themes/base-theme';
import styles from './styles';


const {Notification} = require('NativeModules');
const {User} = require('NativeModules');
const Realm = require('realm');

var id = 0;

class Notifications extends Component {

    constructor(props) {
        super(props);
        this.state = {
            notification_list: []
        };
        this.convertTimestamp             = this.convertTimestamp.bind(this);
        this.buildAttendanceNotifications = this.buildAttendanceNotifications.bind(this);
    }

    buildAttendanceNotifications(){
      // initialize realm
      let realm = new Realm({schema: realm_schema});
      // get notification realm objects
      var notifications = realm.objects('NotificationModel').filtered('s_attendance_id != ""');
      // temp list for notification state
      var notifications_list = [];
      // loop through each notification object and build the notifications
      for(var i = 0; i < notifications.length; i++){

        // get attendance id
        var s_attendance_id = notifications[i].s_attendance_id;

        // get klass id
        var klass = realm.objects('AttendanceModel').filtered('s_attendance_id = "' + s_attendance_id + '"');
        if (klass.length == 0)
          continue;

        var s_klass_id = klass[0].s_klass_id;

        // get course id & name
        var klass = realm.objects('KlassModel').filtered('s_klass_id = "' + s_klass_id + '"');
        if (klass.length == 0)
          continue;
        var s_course_id = klass[0].s_course_id;

        var course = realm.objects('CourseModel').filtered('s_course_id = "' + s_course_id + '"');
        if (course.length == 0)
          continue;
        var course_name = course[0].s_name;

        // get student id & name
        var attendance = realm.objects('AttendanceModel').filtered('s_attendance_id = "' + s_attendance_id + '"');
        if (attendance.length == 0)
          continue;
        var s_student_id = attendance[0].s_student_id;

        var student = realm.objects('StudentModel').filtered('s_student_id = "' + s_student_id + '"');
        if (student.length == 0)
          continue;
        var student_name = student[0].s_name;

        // get timestamp of notification and convert it to date format
        var i_created_at = notifications[i].i_created_at;
        var timestamp = this.convertTimestamp(i_created_at);

        // build the attendance notification
        var checkInNote = student_name + ' 尚未抵達 ' + course_name;

        console.log(i + ". " + checkInNote);

        // temp object for list
        var notify = new Object();
        notify.note = checkInNote;
        notify.date = timestamp;

        notifications_list.push(notify);
      } // end of for loop
      this.setState({notification_list: notifications_list});
    } // end of buildAttendanceNotifications()

    // build the 4 types of notifications
    componentWillMount () {
      // setInterval(()=>{this.fetchNotifications()}, 10000);
      // id = setInterval(()=>{this.fetchNotifications()}, 10000);
      this.buildAttendanceNotifications();
    }

    componentWillUnMount(){
      // clearInterval(id);
    }

    fetchNotifications(){

      let realm = new Realm({schema: realm_schema});
      var users = realm.objects('UserModel').sorted('i_login_at', true);

      if (users.length == 0)
        return;

      // get user access token
      var access_token = users[0].s_access_token;
      var $this = this;
      Notification.getInfo(global_variables.HOST + '/api/v1/notifications?access_token=' + access_token,
        function successCallback(results) {
          $this.buildAttendanceNotifications();
        },
        function errorCallback(results) {
          alert(results.msg);
        });

    }

    convertTimestamp(timestamp) {
      var d = new Date(timestamp * 1000),	// Convert the passed timestamp to milliseconds
      		yyyy = d.getFullYear(),
      		mm = ('0' + (d.getMonth() + 1)).slice(-2),	// Months are zero based. Add leading 0.
      		dd = ('0' + d.getDate()).slice(-2),			// Add leading 0.
      		hh = d.getHours(),
      		h = hh,
      		min = ('0' + d.getMinutes()).slice(-2),		// Add leading 0.
      		ampm = 'AM',
      		time;
      if (hh > 12) {
      		h = hh - 12;
      		ampm = 'PM';
      	} else if (hh === 12) {
      		h = 12;
      		ampm = 'PM';
      	} else if (hh == 0) {
      		h = 12;
      	}
        // ie: 2013-02-18, 8:35 AM
      	time = yyyy + '-' + mm + '-' + dd + ', ' + h + ':' + min + ' ' + ampm;
      return time;
    }

    popRoute(route) {
        this.props.popRoute(route);
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    render() {
        return (
            <Container theme={theme} style={{backgroundColor: '#FFF'}}>
                <Header>
                  <View></View>
                    <Text style={styles.topTitle}>通知</Text>
                      <Button transparent onPress={() => this.popRoute('scanner')}>
                        <Image source={require('../../../images/button/btn_close.png')}/>
                      </Button>
                </Header>
                <View style={{backgroundColor: 'transparent'}}>
                  <ScrollView>
                    <View>
                      <List>
                        {(this.state.notification_list.length != 0 )?this.state.notification_list.map((i, index)=>
                          <ListItem iconLeft button>
                              <Icon name="ios-people" style={{color: '#ff6100'}}/>
                              <View style={{paddingLeft:30}}>
                              <Text style={styles.subBlackTxt} numberOfLines={2}>{i.note}</Text>
                              <Text style={styles.timeTxt} note >{i.date}</Text>
                              </View>
                          </ListItem>
                        ):<View><Text style={{alignSelf:'center',paddingTop:30}}>No Notification</Text></View>}
                      </List>
                    </View>
                  </ScrollView>
                </View>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        popRoute: ()=> dispatch(popRoute()),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(Notifications);
