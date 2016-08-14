/**
 * Created by kylefang on 4/28/16.
 * @flow
 */

'use strict';
//Currently using it as playground

import React, {Component} from 'react';
import {connect} from 'react-redux';
// import CodePush from 'react-native-code-push';
import { Image, View, ScrollView } from 'react-native';
import {openDrawer} from '../../actions/drawer';
import {popRoute, replaceRoute ,pushNewRoute} from '../../actions/route';

import {Container, Header, Title, Content, Text, Button, Icon, List, ListItem, Footer, Thumbnail} from 'native-base';
import FooterComponent from "./../footer";
import CalendarPicker from 'react-native-calendar-picker';

import styles from './styles';
import calendar from './calendar-theme';

import global_variables from '../../global_variables';
const Realm = require('realm');
import realm_schema from '../../realm_schema';
const {Debug} = require('NativeModules');

class Calendar extends Component {
    constructor(props) {
        super(props);
        this.navigateTo = this.navigateTo.bind(this);
        this.state= {
            date: new Date(),
            title: '孩子的行事曆', // Switchable Title( Teacher / Parent )
            children_attendances : [], // Parent's View
            student_attendances: [] // Teacher's View
        };
    }

    navigateTo(route) {
        this.props.replaceRoute(route);
    }

    onDateChange (date) {
        this.setState({ date: date });
    }

    popRoute() {
        this.props.popRoute();
    }

    pushNewRoute(route) {
         this.props.pushNewRoute(route);
    }

    componentWillMount(){
      // temp object for list
      var attendance = new Object();
      var temp_attendance_list = [];
      attendance.isLeave = true; //請假
      attendance.class_time = '6:00~7:00 PM';
      attendance.class_name = '兒童英語對話 A班';
      attendance.student_name = '王小明';
      temp_attendance_list.push(attendance);
      //this.state.children_attendances.push(attendance);

      this.getAttendance(this.today());
    }

    // return today's timestamp
    today(){
      var now = new Date();
      var startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      var timestamp = startOfDay / 1000;

      return timestamp
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
      	time = h + ':' + min + ' ' + ampm;
      return time;
    }

    isStudentInKlass(student_id, klass_id){

      let realm = new Realm({schema: realm_schema});
      // get all the classes today, then filter using student id
      var klass = realm.objects('KlassModel').filtered('s_klass_id = "' + klass_id + '"')[0];
      // check if student is in klass
      var course = realm.objects('CourseStudentModel').filtered('s_course_id = "' + klass.s_course_id + '"');

      var klass_students = course[0].students;

      for (var i = 0; i < klass_students.length; i++){
        if (klass_students[i].string == student_id){
          return true;
        }
      } // end of for loop

      return false;
    } // end of function

    getAttendance(date){

      let realm = new Realm({schema: realm_schema});

      // if user selected a date prior to today...
      if (date < this.today()){
          console.log('here, prior today');
          // get current logged in user_id
          var users = realm.objects('UserModel').sorted('i_login_at', true);
          var user_id = users[users.length-1].s_user_id;
          // get parent_id
          var parent = realm.objects('ParentModel').filtered('s_user_id = "' + user_id + '"')[0];
          var parent_id = parent.s_parent_id;

          // get all parent's kids
          var students = realm.objects('StudentModel').filtered('s_parent_id = "' + parent_id + '"');
          // get today's classes
          var classes_today = realm.objects('KlassModel').filtered('i_start_date < ' + this.today());

          var cell = [];
          // for each student get the klasses they are actually enrolled in
          for (var i = 0; i < students.length; i++){

            // create cell_data dictionary and add values in it
            for (var j = 0; j < classes_today.length; j++){

              if ( !this.isStudentInKlass(students[i].s_student_id, classes_today[j].s_klass_id) ) {
                  continue;
              }

              var cell_data = {};

              var start_time = this.convertTimestamp(classes_today[j].i_start_date);
              cell_data['start_time'] = start_time;
              var end_time = this.convertTimestamp(classes_today[j].i_end_date);
              cell_data['end_date'] = end_time;
              var course_name = realm.objects('CourseModel').filtered('s_course_id = "' + classes_today[j].s_course_id + '"')[0].s_name;
              cell_data['course_name'] = course_name;
              var student_name = students[i].s_name;
              cell_data['student_name'] = student_name;
              var status = realm.objects('AttendanceModel').filtered('s_klass_id = "' + classes_today[j].s_klass_id + '" AND s_student_id = "' + students[i].s_student_id + '"')[0].s_status;

              cell_data['status'] = status;

              Debug.variable(cell_data);
              cell.push(cell_data);
            } // end of for loop 'klasses'
          } // end of for loop 'students'
        } // end of if
      // if user selected a date after today including today
      else{
          console.log('here, after today');
          // get current logged in user_id
          var users = realm.objects('UserModel').sorted('i_login_at', true);
          var user_id = users[users.length-1].s_user_id;
          // get parent_id
          var parent = realm.objects('ParentModel').filtered('s_user_id = "' + user_id + '"')[0];
          var parent_id = parent.s_parent_id;

          // get all parent's kids
          var students = realm.objects('StudentModel').filtered('s_parent_id = "' + parent_id + '"');
          // get today's classes
          var classes_today = realm.objects('KlassModel').filtered('i_start_date >= ' + this.today());

          var cell = [];
          // for each student get the klasses they are actually enrolled in
          for (var i = 0; i < students.length; i++){

            // create cell_data dictionary and add values in it
            for (var j = 0; j < classes_today.length; j++){

              if ( !this.isStudentInKlass(students[i].s_student_id, classes_today[j].s_klass_id) ) {
                  continue;
              }

              var cell_data = {};

              var start_time = this.convertTimestamp(classes_today[j].i_start_date);
              cell_data['start_time'] = start_time;
              var end_time = this.convertTimestamp(classes_today[j].i_end_date);
              cell_data['end_date'] = end_time;
              var course_name = realm.objects('CourseModel').filtered('s_course_id = "' + classes_today[j].s_course_id + '"')[0].s_name;
              cell_data['course_name'] = course_name;
              var student_name = students[i].s_name;
              cell_data['student_name'] = student_name;
              var status = realm.objects('AttendanceModel').filtered('s_klass_id = "' + classes_today[j].s_klass_id + '" AND s_student_id = "' + students[i].s_student_id + '"');

              if (status.length == 0)
                cell_data['status'] = '我要請假';
              else
                cell_data['status'] = '取消請假';

              Debug.variable(cell_data);
              cell.push(cell_data);
            } // end of for loop 'klasses'
          } // end of for loop 'students'
        } // end of else
    }



    render() {
        return (
            <Container theme={calendar} style={{backgroundColor: '#f5f6f7'}}>
                <Header style={{borderColor:"rgba(181, 181, 181, 0.34)",borderBottomWidth:1.1,height:70}}>
                  <Button transparent onPress={() => this.navigateTo('scanner')}>
                    <Image source={require('../../../images/button/btn_back.png')}/>
                  </Button>
                    <Text style={styles.topTitle}>{this.state.title}</Text>
                </Header>
                <View  style={{backgroundColor: '#f5f6f7'}}>
                  <View style={{borderColor:"rgba(181, 181, 181, 0.34)",borderBottomWidth:1.1,marginBottom:-10}}>
                    <CalendarPicker
                        style={{textColor:'#000'}}
                        selectedDate={this.state.date}
                        selectedBackgroundColor={'#000'}
                        onDateChange={this.onDateChange.bind(this)}/>
                  </View>
                  <ScrollView style={{paddingTop:18}}>
                    <View style={styles.listItem}>
                      <Button rounded style={styles.leaveButton}><View><Text style={styles.leaveBtnTxt}>請假</Text></View></Button>
                      <Thumbnail style={styles.studentPhoto} source={require('../../../images/contacts/sanket.png')}/>
                        <View style={{flexDirection:'column'}}>
                          <Text style={styles.list_arrived_time}>6:00 ~ 7:00 PM</Text>
                          <Text style={styles.list_class_name}>兒童英語對話 Ａ班</Text>
                          <Text style={styles.list_student_name}>王大明</Text>
                        </View>
                        <Button
                          transparent
                          onPress={() => this.pushNewRoute('scanner')}>
                          <Image source={require('../../../images/button/btn_arrow.png')}/>
                        </Button>
                    </View>
                  </ScrollView>
                </View>
            </Container>
        )
    }
}

// {(this.state.children_attendances.length != 0)?this.state.children_attendances.map((i, index)=>
//   <ListItem iconLeft button>
//       <Icon name="ios-people" style={{color: '#ff6100'}}/>
//       <View style={{paddingLeft:30}}>
//       <Text numberOfLines={2}>{i}</Text>
//       </View>
//   </ListItem>
// ):<View><Text style={{alignSelf:'center'}}>No Attendance</Text></View>}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        popRoute: () => dispatch(popRoute()),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(Calendar);
