/**
 * Created by kylefang on 4/28/16.
 * @flow
 */

'use strict';
//Currently using it as playground

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {openDrawer} from '../../actions/drawer';
import {popRoute, replaceRoute,pushNewRoute} from '../../actions/route';
// import CodePush from 'react-native-code-push';
import { Image, View, VibrationIOS, ScrollView} from 'react-native';
import {Container, Header, Title, Content, Text, Button, Icon, List, ListItem, Footer, Card, CardItem, Thumbnail} from 'native-base';
import FooterComponent from "./../footer";

import theme from '../../themes/base-theme';
import styles from './styles';
import Camera from 'react-native-camera';
import Modal from 'react-native-modalbox';
import Overlay from 'react-native-overlay';
import { Col, Row, Grid } from "react-native-easy-grid";

import global_variables from '../../global_variables';
import realm_schema from '../../realm_schema';

const {Klass}        = require('NativeModules');
const {Teacher}      = require('NativeModules');
const {Attendance}   = require('NativeModules');
const {User}         = require('NativeModules');
const {Course}       = require('NativeModules');
const {Student}      = require('NativeModules');
const {Notification} = require('NativeModules');
const Realm          = require('realm');

class ScannerOverlay extends Component {
  constructor(props){
     super(props);
     this.barCodeData = "";
     this.state = {
       student_arrivals: 0,
       student_leaves:0,
       student_absence:0,
       course_name:'',
       start_time:'',
       end_time:'',
       organization_name:'',
       absent_students:[]
       };
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
        // ie: 8:35 AM
      	time = h + ':' + min + ' ' + ampm;
      return time;
    }

    accessToken(){
       let realm = new Realm({schema: realm_schema});
       // get user access token
       var users = realm.objects('UserModel').sorted('i_login_at', true);
       var access_token = users[users.length-1].s_access_token;

       return access_token;
    }

    getClassCurrentAttendance(){

      // add temp code here
      let realm = new Realm({schema: realm_schema});
      // get all student IDs and save in array
      var temp_course = realm.objects('CourseStudentModel').filtered('s_course_id = "5ff2a1a7-78d9-4835-91a9-566ce9ed6651"')[0];
      // get all students in the class
      var temp_students = temp_course.students;
      // get total count of all students in the class
      var temp_student_count = temp_students.length;
      // get attendance model
      var temp_attendance = realm.objects('AttendanceModel').sorted('i_arrived_at', true); // true is descending order
      // get klass id
      var temp_klass_id = temp_attendance[0].s_klass_id;
      // get list of arrived students
      var temp_arrived_students = realm.objects('AttendanceModel').filtered('s_status = "arrived" AND s_klass_id = "' + temp_klass_id + '"');
      // get total count of arrived students
      var temp_arrived_count = temp_arrived_students.length;
      // get list of leave students
      var temp_leave_students = realm.objects('AttendanceModel').filtered('s_status = "leave" AND s_klass_id = "' + temp_klass_id + '"');
      // get total count of leave students
      var temp_leave_count = temp_leave_students.length;

      console.log('temp_leave_count = ' + temp_leave_count);
      console.log('temp_arrived_count = ' + temp_arrived_count);

      // combine both arrived and leave students into one array
      var temp_students_confirmed = [];
      for(var i = 0; i < temp_leave_count; i++){
          temp_students_confirmed.push(temp_leave_students[i].s_student_id);
      }
      for(var i = 0; i < temp_arrived_count; i++){
          temp_students_confirmed.push(temp_arrived_students[i].s_student_id);
      }

      // get list of absent students
      var temp_absent_students = [];
      for(var i = 0; i < temp_student_count; i++){
        if(temp_students_confirmed.indexOf(temp_students[i].string) == -1){
            temp_absent_students.push(temp_students[i].string);
        }
      }



      // get absent student count
      var temp_absent_count = temp_absent_students.length;

      console.log('confirmed count = ' + temp_students_confirmed.length);

      console.log('total count = ' + temp_student_count);
      console.log('arrived count = ' + temp_arrived_count);
      console.log('leave count = ' + temp_leave_count);
      console.log('absent count = ' + temp_absent_count);
      // end of temp code

      // set student statistics
      this.setState({absent_students:temp_absent_students}); // 未到學生名單
      this.setState({student_arrivals:temp_arrived_count}); // 抵達
      this.setState({student_leaves:temp_leave_count}); // 請假
      this.setState({student_absent:temp_absent_count}); // 未到

    }

    // synchronize front/backend DB here.. call ALL 'GET APIs'
    componentWillMount () {

      let realm = new Realm({schema: realm_schema});
      // get most current attendance data
      var attendance = realm.objects('AttendanceModel').sorted('i_arrived_at', true)[0];
      // get klass id from attendance model to get klass location, start/end time
      var klass = realm.objects('KlassModel').filtered('s_klass_id = "' + attendance.s_klass_id + '"')[0];
      var start_time = this.convertTimestamp(klass.i_start_date);
      var end_time = this.convertTimestamp(klass.i_end_date);
      // get course name
      var course = realm.objects('CourseModel').filtered('s_course_id = "' + klass.s_course_id + '"')[0];
      var course_name = course.s_name;
      // get organization name
      var organization = realm.objects('OrganizationModel').filtered('s_organization_id = "' + course.s_organization_id + '"')[0];
      var organization_name = organization.s_name;

      console.log('course_name = ' + course_name);
      console.log('start time = '  + start_time);
      console.log('end_time = '    + end_time);

      // set title information
      this.setState({course_name:course_name}); // 課程名稱
      this.setState({time:start_time}); // 課程開始時間
      this.setState({end_time:end_time}); // 課程結束時間
      this.setState({organization_name:organization_name}); // 補習班/組織 名稱

      this.getClassCurrentAttendance();
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    popRoute() {
        this.props.popRoute();
    }

    pushNewRoute(route) {
         this.props.pushNewRoute(route);
    }

    render() {
        return (
              <View style={{flex:1,backgroundColor:'#f5f6f7'}}>
                <View style={styles.overlay}>
                  <ScrollView contentContainerStyle={{paddingTop:20}}>
                    <Button transparent style={{alignSelf:'flex-end'}}
                      onPress={() => this.popRoute()}>
                      <Image source={require('../../../images/button/btn_close.png')}/>
                    </Button>
                    <View style={styles.overlay}>
                        <Text style={styles.modalTitleCh}>{this.state.course_name}</Text>
                        <Text style={styles.subtitle}>{this.state.organization_name}</Text>
                        <Text style={styles.subtitle}>1{this.state.start_time} ~ {this.state.end_time}</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-around',padding:20}}>
                          <View>
                              <Text style={styles.arriveTxtCh}>抵達</Text>
                              <Text style={styles.arriveNum}>{this.state.student_arrivals}</Text>
                          </View>
                          <View>
                              <Text style={styles.abscenceTxtCh}>請假</Text>
                              <Text style={styles.abscenceNum}>{this.state.student_leaves}</Text>
                          </View>
                          <View>
                              <Text style={styles.leaveTxtCh}>未到</Text>
                              <Text style={styles.leaveNum}>{this.state.student_absence}</Text>
                          </View>
                        </View>
                      </View>
                    <Grid style={styles.gridStyle}>
                      <Text style={styles.overlayAbsence}>未到名單</Text>
                      <Row>
                        <Col>
                          <Row style={styles.overlayRow}>
                          <Thumbnail style={{width:70,height:70,borderRadius:35,alignSelf:'center'}}source={require('../../../images/contacts/sanket.png')} />
                            <Text style={{alignSelf:'center'}}>Card Header</Text>
                          </Row>
                          <Row style={styles.overlayRow}>
                            <Thumbnail style={{width:70,height:70,borderRadius:35,alignSelf:'center'}}source={require('../../../images/contacts/sanket.png')} />
                              <Text style={{alignSelf:'center'}}>Card Header</Text>
                          </Row>
                          <Row style={styles.overlayRow}>
                            <Thumbnail style={{width:70,height:70,borderRadius:35,alignSelf:'center'}}source={require('../../../images/contacts/sanket.png')} />
                              <Text style={{alignSelf:'center'}}>Card Header</Text>
                          </Row>
                        </Col>
                        <Col>
                          <Row style={styles.overlayRow}>
                          <Thumbnail style={{width:70,height:70,borderRadius:35,alignSelf:'center'}}source={require('../../../images/contacts/sanket.png')} />
                            <Text style={{alignSelf:'center'}}>Card Header</Text>
                          </Row>
                          <Row style={styles.overlayRow}>
                            <Thumbnail style={{width:70,height:70,borderRadius:35,alignSelf:'center'}}source={require('../../../images/contacts/sanket.png')} />
                              <Text style={{alignSelf:'center'}}>Card Header</Text>
                          </Row>
                          <Row style={styles.overlayRow}>
                            <Thumbnail style={{width:70,height:70,borderRadius:35,alignSelf:'center'}}source={require('../../../images/contacts/sanket.png')} />
                              <Text style={{alignSelf:'center'}}>Card Header</Text>
                          </Row>
                        </Col>
                        <Col>
                          <Row style={styles.overlayRow}>
                          <Thumbnail style={{width:70,height:70,borderRadius:35,alignSelf:'center'}}source={require('../../../images/contacts/sanket.png')} />
                            <Text style={{alignSelf:'center'}}>Card Header</Text>
                          </Row>
                          <Row style={styles.overlayRow}>
                            <Thumbnail style={{width:70,height:70,borderRadius:35,alignSelf:'center'}}source={require('../../../images/contacts/sanket.png')} />
                              <Text style={{alignSelf:'center'}}>Card Header</Text>
                          </Row>
                          <Row style={styles.overlayRow}>
                            <Thumbnail style={{width:70,height:70,borderRadius:35,alignSelf:'center'}}source={require('../../../images/contacts/sanket.png')} />
                              <Text style={{alignSelf:'center'}}>Card Header</Text>
                          </Row>
                        </Col>
                        <Col>
                          <Row style={styles.overlayRow}>
                          <Thumbnail style={{width:70,height:70,borderRadius:35,alignSelf:'center'}}source={require('../../../images/contacts/sanket.png')} />
                            <Text style={{alignSelf:'center'}}>Card Header</Text>
                          </Row>
                          <Row style={styles.overlayRow}>
                            <Thumbnail style={{width:70,height:70,borderRadius:35,alignSelf:'center'}}source={require('../../../images/contacts/sanket.png')} />
                              <Text style={{alignSelf:'center'}}>Card Header</Text>
                          </Row>
                          <Row style={styles.overlayRow}>
                            <Thumbnail style={{width:70,height:70,borderRadius:35,alignSelf:'center'}}source={require('../../../images/contacts/sanket.png')} />
                              <Text style={{alignSelf:'center'}}>Card Header</Text>
                          </Row>
                        </Col>
                      </Row>
                   </Grid>
                    </ScrollView>
              </View>
          </View>
        )
    }
}

function bindAction(dispatch) {
    return {
        popRoute: ()=> dispatch(popRoute()),
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route))
    }
}

export default connect(null, bindAction)(ScannerOverlay);
