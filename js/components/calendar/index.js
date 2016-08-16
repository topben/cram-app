/**
 * Created by kylefang on 4/28/16.
 * @flow
 */

'use strict';
//Currently using it as playground

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
// import CodePush from 'react-native-code-push';
import { Image, View, ScrollView,InteractionManager } from 'react-native';
import {openDrawer} from '../../actions/drawer';
import {popRoute, replaceRoute ,pushNewRoute} from '../../actions/route';

import {Container, Header, Title, Content, Text, Button, Icon, List, ListItem, Footer, Thumbnail} from 'native-base';
import FooterComponent from "./../footer";
import CalendarPicker from 'react-native-calendar-picker';

import styles from './styles';
import calendar from './calendar-theme';
import StudentStatus from './student-status';

import global_variables from '../../global_variables';
const Realm = require('realm');
import realm_schema from '../../realm_schema';
const {Debug} = require('NativeModules');

type Props = {
  date: date
};


class Calendar extends Component {
    props: Props;
    constructor(props) {
        super(props);
        this.navigateTo = this.navigateTo.bind(this);
        this.getAttendance = this.getAttendance.bind(this);
        this.convertDateToTimeStamp = this.convertDateToTimeStamp.bind(this);
        this.state= {
            date: new Date(),
            title: '孩子的行事曆', // Switchable Title( Teacher / Parent )
            children_attendances : [], // Parent's View
            student_attendances: [], // Teacher's View
            isUpdateDate: false
        };
    }

    navigateTo(route) {
        this.props.replaceRoute(route);
    }

    onDateChange (date) {
        console.log("The Datee!!!"+date);
        // unresolved problem delayed interaction
        this.getAttendance(this.convertDateToTimeStamp(date));
        this.setState({ date: date , isUpdateDate: false});
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
      // console.log('up here, timestamp = ' + timestamp);
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

    convertDateToTimeStamp(date)
    {
      var myDate=String(date);

      myDate=myDate.split(" ");
      var month = new Array();
          month["Jan"] = 1;
          month["Feb"] = 2;
          month["Mar"] = 3;
          month["Apr"] = 4;
          month["May"] = 5;
          month["June"] = 6;
          month["July"] = 7;
          month["Aug"] = 8;
          month["Sept"] = 9;
          month["Oct"] = 10;
          month["Nov"] = 11;
          month["Dec"] = 12;

      var newDate=month[myDate[1]]+"/"+myDate[2]+"/"+myDate[3];
      //console.log("converted"+newDate);
      // console.log("the"+new Date(newDate).getTime()/1000+"date")
      return (new Date(newDate).getTime()/1000);
    }

    isStudentInKlass(student_id, klass_id){

      let realm = new Realm({schema: realm_schema});

      // get all the classes today, then filter using student id
      var klass = {};
      if (typeof realm.objects('KlassModel').filtered('s_klass_id = "' + klass_id + '"')[0] != 'undefined')
      {
        klass = realm.objects('KlassModel').filtered('s_klass_id = "' + klass_id + '"')[0];
      }
      else
      {
          return;
      }

      // check if student is in klass
      var course = realm.objects('CourseStudentModel').filtered('s_course_id = "' + klass.s_course_id + '"');
      var klass_students = {};
      if( typeof course[0].students != 'undefined')
      {
        klass_students = course[0].students;
      }
      else
      {
          return;
      }

      for (var i = 0; i < klass_students.length; i++){
        if (klass_students[i].string == student_id){
          return true;
        }
      } // end of for loop

      return false;
    } // end of function

    getAttendance(date){
      // console.log('lalalal, date = ' + date);
      let realm = new Realm({schema: realm_schema});

      // if user selected a date prior to today...
      if (date < this.today()){
          console.log('here, prior today');
          var cell = [];
          this.setState({children_attendances:cell});

          // get current logged in user_id
          var users = realm.objects('UserModel').sorted('i_login_at', true);
          var user_id = users[users.length-1].s_user_id;

          // get parent_id
          var parent = {};
          var parent_id = 0;
          if(typeof realm.objects('ParentModel').filtered('s_user_id = "' + user_id + '"')[0] != 'undefined')
          {
            parent = realm.objects('ParentModel').filtered('s_user_id = "' + user_id + '"');
          }
          else
          {
            return ;
          }

          var students = [];

          for (var i = 0; i < parent.length; i++){
              var child = realm.objects('StudentModel').filtered('s_parent_id = "' + parent[i].s_parent_id + '"');

              for (var j = 0; j < child.length; j++){
                students.push(child[j]);
              }
          }


          var date = date - (date % 86400000);

          // get today's classes
          var classes_today = realm.objects('KlassModel').filtered('i_start_date >= ' + date + ' AND i_start_date < ' + (date + 86400000));

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
              cell_data['end_time'] = end_time;
              var course_name = {};
              if(typeof realm.objects('CourseModel').filtered('s_course_id = "' + classes_today[j].s_course_id + '"')[0] != 'undefined')
              {
                course_name = realm.objects('CourseModel').filtered('s_course_id = "' + classes_today[j].s_course_id + '"')[0].s_name;
                cell_data['course_name'] = course_name;
              }
              else
              {
                  continue;
              }

              var student_name = students[i].s_name;
              cell_data['student_name'] = student_name;
              var status = '';
              if (typeof realm.objects('AttendanceModel').filtered('s_klass_id = "' + classes_today[j].s_klass_id + '" AND s_student_id = "' + students[i].s_student_id + '"')[0] != 'undefined')
              {
                status = realm.objects('AttendanceModel').filtered('s_klass_id = "' + classes_today[j].s_klass_id + '" AND s_student_id = "' + students[i].s_student_id + '"')[0].s_status;
              }
              else
              {
                  continue;
              }

              var now = new Date();
              now = now.getTime() / 1000;

              if(now > classes_today[j].i_end_date){
                cell_data['status'] = status;
                cell_data['arrived_at'] = this.convertTimestamp(status.i_arrived_at);
              }
              else{
                cell_data['status'] = 'leave-button';

                if (status.length == 0)
                  cell_data['is_toggled'] = true;
                else
                  cell_data['is_toggled'] = false;
              }

              cell_data['status'] = status;
              cell_data['is_toggled'] = false;

              Debug.variable(cell_data);
              cell.push(cell_data);
              console.log('CELL'+cell);
              this.setState({children_attendances:cell});

            } // end of for loop 'klasses'
          } // end of for loop 'students'
        } // end of if
      // if user selected a date after today including today
      else{
          var cell = [];
          this.setState({children_attendances:cell});
          console.log('here, after today');
          // get current logged in user_id
          var users = realm.objects('UserModel').sorted('i_login_at', true);
          var user_id = users[0].s_user_id;

          var parent = {};
          var parent_id = 0;
          // get parent_id
          if(typeof realm.objects('ParentModel').filtered('s_user_id = "' + user_id + '"')[0] != 'undefined')
          {
            parent = realm.objects('ParentModel').filtered('s_user_id = "' + user_id + '"');
          }
          else
          {
            return;
          }
          // console.log('user id = ' + user_id);
          // console.log('parent id = ' + parent_id);

          var students = [];

          for (var i = 0; i < parent.length; i++){
              var child = realm.objects('StudentModel').filtered('s_parent_id = "' + parent[i].s_parent_id + '"');

              for (var j = 0; j < child.length; j++){
                students.push(child[j]);
              }
          }

          // get all parent's kids
          // var students = realm.objects('StudentModel').filtered('s_parent_id = "' + parent_id + '"');
          console.log('student count = ' + students.length);
          // get today's classes
          // console.log('date = ' + date);
          var date = date - (date % 86400);

          console.log('beginning date = ' + date);
          console.log('end date = ' + (date + 172800 - 28800));

          var classes_today = realm.objects('KlassModel').filtered('i_start_date >= ' + (date+86400 - 28800) + ' AND i_start_date <' + (date+172800-28800));
          // console.log('classes today count = ' + classes_today.length);
          // for each student get the klasses they are actually enrolled in
          for (var i = 0; i < students.length; i++){
            // console.log('lalalala');
            // create cell_data dictionary and add values in it
            for (var j = 0; j < classes_today.length; j++){
              // console.log('student_id = ' + students[i].s_student_id);
              // console.log('klass_id = ' + classes_today[j].s_klass_id);
              if ( !this.isStudentInKlass(students[i].s_student_id, classes_today[j].s_klass_id) ) {
                  continue;
              }

              var cell_data = {};
              console.log('here.....');
              var start_time = this.convertTimestamp(classes_today[j].i_start_date);
              cell_data['start_time'] = start_time;
              var end_time = this.convertTimestamp(classes_today[j].i_end_date);
              cell_data['end_time'] = end_time;
              var course_name = '';
              if(typeof realm.objects('CourseModel').filtered('s_course_id = "' + classes_today[j].s_course_id + '"')[0] != 'undefined')
              {
                course_name = realm.objects('CourseModel').filtered('s_course_id = "' + classes_today[j].s_course_id + '"')[0].s_name;
                cell_data['course_name'] = course_name;
              }
              else
              {
                  continue;
              }

              var student_name = students[i].s_name;
              cell_data['student_name'] = student_name;

              var status = realm.objects('AttendanceModel').filtered('s_klass_id = "' + classes_today[j].s_klass_id + '" AND s_student_id = "' + students[i].s_student_id + '"');
              var student_id = students[i].s_student_id;
              cell_data['student_id'] = student_id;
              var klass_id = classes_today[j].s_klass_id;
              cell_data['klass_id'] = klass_id;

              console.log('klass id = ' + classes_today[j].s_klass_id);
              console.log('student id = ' + student_id);


              var now = new Date();
              now = now.getTime() / 1000;

              console.log('now = ' + now);
              console.log('end date = ' + classes_today[j].i_end_date);

              if(now > classes_today[j].i_end_date){
                if (status.length == 0)
                  continue;

                cell_data['status'] = status[0].s_status;
                cell_data['arrived_at'] = this.convertTimestamp(status.i_arrived_at);
              }
              else{
                cell_data['status'] = 'leave-button';

                if (status.length == 0)
                  cell_data['is_toggled'] = true;
                else
                  cell_data['is_toggled'] = false;
              }

              Debug.variable(cell_data);
              cell.push(cell_data);
              this.setState({children_attendances:cell});
            } // end of for loop 'klasses'
          } // end of for loop 'students'
        } // end of else
    }



    render() {
      var _scrollView: ScrollView;
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
                  <View>
                  <ScrollView style={{height:this.state.children_attendances.length*20,paddingTop:18}}
                    ref={(scrollView) => { _scrollView = scrollView; }}
                    automaticallyAdjustContentInsets={false}
                    scrollEventThrottle={200}>
                      {(this.state.children_attendances.length != 0 )?this.state.children_attendances.map((i, index)=>
                    <View style={styles.listItem}>
                        <StudentStatus status_type={i.status} isToggled={i.is_toggled} student_id ={i.student_id} klass_id ={i.klass_id}/>
                        <Thumbnail style={styles.studentPhoto} source={require('../../../images/contacts/sanket.png')}/>
                            <View style={{flexDirection:'column'}}>
                            <Text style={styles.list_arrived_time}>{i.start_time}-{i.end_time}</Text>
                            <Text style={styles.list_class_name} numberOfLines={2} >{i.course_name}</Text>
                            <Text style={styles.list_student_name}>{i.student_name}</Text>
                          </View>
                          <Button
                            transparent
                            style={{alignSelf:'center'}}
                            onPress={() => this.pushNewRoute('scanner')}>
                            <Image source={require('../../../images/button/btn_arrow.png')}/>
                          </Button>
                        </View>
                      ):<View><Text style={{alignSelf:'center',paddingTop:30}}>No Attendances</Text></View>}
                  </ScrollView>
                </View>
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
