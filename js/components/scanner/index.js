/**
 * Created by kylefang on 4/28/16.
 * @flow
 */

'use strict';
//Currently using it as playground

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {openDrawer} from '../../actions/drawer';
import {popRoute, replaceRoute ,pushNewRoute} from '../../actions/route';
// import CodePush from 'react-native-code-push';
import { Image, View, VibrationIOS, ScrollView,InteractionManager,AlertIOS} from 'react-native';
import {Container, Header, Title, Content, Text, Button, Icon, List, ListItem, Footer, Card, CardItem, Thumbnail, Badge} from 'native-base';
import Spinner from './../loaders/Spinner';
import FooterComponent from "./../footer";
import theme from '../../themes/base-theme';
import scanner from './scanner-theme';
import styles from './styles';
import Camera from 'react-native-camera';
import Modal from 'react-native-modalbox';
import { Col, Row, Grid } from "react-native-easy-grid";
import global_variables from '../../global_variables';
import realm_schema from '../../realm_schema';

const {Debug}        = require('NativeModules');
const {Klass}        = require('NativeModules');
const {Parent}       = require('NativeModules');
const {Teacher}      = require('NativeModules');
const {Attendance}   = require('NativeModules');
const {User}         = require('NativeModules');
const {Course}       = require('NativeModules');
const {Student}      = require('NativeModules');
const {Notification} = require('NativeModules');
const {Organization} = require('NativeModules');
const Realm          = require('realm');

var count = 0;
var interval_id = 0;
var timeout_id = 0;
var studentList_id = 0;
var canScan = true;

class Scanner extends Component {
  constructor(props){
     super(props);
     this.onBarCodeRead                  = this.onBarCodeRead.bind(this);
     this.openClassModal                 = this.openClassModal.bind(this);
     this.closeClassModal                = this.closeClassModal.bind(this);
     this.openStudentModalAlpha          = this.openStudentModalAlpha.bind(this);
     this.closeStudentModalAlpha         = this.closeStudentModalAlpha.bind(this);
     this.openStudentModalBeta           = this.openStudentModalBeta.bind(this);
     this.closeStudentModalBeta          = this.closeStudentModalBeta.bind(this);
     this.convertTimestamp               = this.convertTimestamp.bind(this);
     this.getClassCurrentAttendance      = this.getClassCurrentAttendance.bind(this);
     this.showModalCheckInTitleAnimation = this.showModalCheckInTitleAnimation.bind(this);

     this.barCodeData = "";
     this.state = {
       swipeToClose: true,
       name: '',
       status: '',
       arrived_at: '',
       profileImage: '',
       student_arrivals: 0,
       student_leaves:0,
       student_absence:0,
       isOpenStudentModalAlpha: false,
       isOpenStudentModalBeta: false,
       isNewStudentModal: false,
       isCheckRealmOK: false,
       isProcessing: false,
       processingCount:0,
       studentModalStyleAlpha: styles.student_card_white,
       badgeCount:0
       };
    }

    pushNewRoute(route) {
         this.props.pushNewRoute(route);
    }

    fetch_for_modal() {
      var $this = this;
      // add all code of check in successCallback here..
      let realm = new Realm({schema: realm_schema});

      var haha = realm.objects('AttendanceModel');

      // set student info state for student arrival modal
      var studentModel = realm.objects('StudentModel').filtered('s_qr_code_id = "' + this.barCodeData + '"');

      if (studentModel.length == 0){
        studentModel = realm.objects('StudentModel').filtered('s_student_id = "' + this.barCodeData + '"');
      }

      if (studentModel.length == 0)
        return;

      studentModel = studentModel[0];

      this.setState({name: studentModel.s_name});

      var models = realm.objects('AttendanceModel').filtered('s_student_id = "' + studentModel.s_student_id + '"').sorted('i_arrived_at');
      var attendanceModel = models[models.length-1];

       // switch status to specific chinese words
      if(attendanceModel.s_status == 'arrived')
      {
        $this.setState({status: '抵達'});
      }

      // split datetime string to "time"
      var arrived_at = $this.convertTimestamp(attendanceModel.i_arrived_at);
      arrived_at = arrived_at.split(",")[1];
      this.setState({arrived_at: arrived_at});

      // show modal animation
      this.modalAnimation();

      this.getClassCurrentAttendance();
      clearInterval(interval_id);


      // clear interval
      clearInterval(timeout_id);

      // set timeout for class modal
      timeout_id = setInterval(function(){
        $this.closeStudentModalBeta();
        $this.closeStudentModalAlpha();
        $this.openClassModal();
        clearInterval(timeout_id);
      }, 3000);

      canScan = true;
    }

    // for testing
    componentWillMount() {
      this.fetchNotifications();
      //this.openClassModal();
    }

    fetchNotifications(){

      let realm = new Realm({schema: realm_schema});
      var users = realm.objects('UserModel').sorted('i_login_at', true);

      if (users.length == 0)
        return;

      var unread_notifications = realm.objects('NotificationModel').filtered('b_isRead == false').length;
      this.setState({badgeCount:unread_notifications});


      // get user access token
      var access_token = users[0].s_access_token;
      var $access_token = access_token;

      Attendance.getInfo(global_variables.HOST + '/api/v1/notifications?access_token=' + access_token,
        function successCallback(results) {

          Notification.getInfo(global_variables.HOST + '/api/v1/notifications?access_token=' + $access_token,
            function successCallback(results) {

            },
            function errorCallback(results) {
              alert(results.msg);
            });

        },
        function errorCallback(results) {
          alert(results.msg);
        });

    }

    getStudentListForEachCourse(){

      let realm = new Realm({schema: realm_schema});
      var courses = realm.objects('CourseModel');
      var users = realm.objects('UserModel').sorted('i_login_at', true);

      if (courses.length == 0 || users.length == 0)
        return;

      // get user access token
      var access_token = users[0].s_access_token;

      for (var i = 0; i < courses.length; i++){

        Course.getStudentList(courses[i].s_course_id, global_variables.HOST + '/api/v1/students?access_token=' + access_token,
          function successCallback(results) {

          },
          function errorCallback(results) {
            alert(results.msg);
          });
      }

      clearInterval(studentList_id);
    }

    // synchronize front/backend DB here.. call ALL 'GET APIs'
    componentDidMount () {
         console.log('path = ' + Realm.defaultPath);

         setInterval(()=>{this.fetchNotifications()}, 10000);
         var $this = this;

         // set interval for class modal
         interval_id = setInterval(function(){
           let realm = new Realm({schema: realm_schema});
           var users = realm.objects('UserModel');
           if (users.length == 1){

             // get user access token
             var users = realm.objects('UserModel').sorted('i_login_at', true);
             var access_token = users[0].s_access_token;

            //  realm.write(() => {
            //   let attendances = realm.objects('AttendanceModel');
            //   realm.delete(attendances);
              // let notifications = realm.objects('NotificationModel');
              // realm.delete(notifications);
            //  });

               // perform api calls
               User.getInfo(global_variables.HOST + '/api/v1/me?access_token=' + access_token,
                 function successCallback(results) {
                   $this.setState({processingCount:$this.state.processingCount+1});
                 },
                 function errorCallback(results) {
                   alert(results.msg);
                 });

                Student.getInfo(global_variables.HOST + '/api/v1/students?access_token=' + access_token,
                  function successCallback(results) {
                    $this.setState({processingCount:$this.state.processingCount+1});
                  },
                  function errorCallback(results) {
                    alert(results.msg);
                  });

                Course.getInfo(global_variables.HOST + '/api/v1/courses?access_token=' + access_token,
                  function successCallback(results) {
                    $this.setState({processingCount:$this.state.processingCount+1});
                      console.log('here');
                      studentList_id = setInterval(()=>{$this.getStudentListForEachCourse()}, 200);
                  },
                  function errorCallback(results) {
                    alert(results.msg);
                  });

                Notification.getInfo(global_variables.HOST + '/api/v1/notifications?access_token=' + access_token,
                  function successCallback(results) {
                    $this.setState({processingCount:$this.state.processingCount+1});
                  },
                  function errorCallback(results) {
                    alert(results.msg);
                  });

                Attendance.getInfo(global_variables.HOST + '/api/v1/attendances?access_token=' + access_token,
                  function successCallback(results) {
                    $this.setState({processingCount:$this.state.processingCount+1});
                  },
                  function errorCallback(results) {
                    alert(results.msg);
                  });

                Klass.getInfo(global_variables.HOST + '/api/v1/classes?access_token=' + access_token,
                  function successCallback(results) {
                    $this.setState({processingCount:$this.state.processingCount+1});
                  },
                  function errorCallback(results) {
                    alert(results.msg);
                  });

                Organization.getInfo(global_variables.HOST + '/api/v1/organizations?access_token=' + access_token,
                  function successCallback(results) {
                    $this.setState({processingCount:$this.state.processingCount+1});
                  },
                  function errorCallback(results) {
                    alert(results.msg);
                  });

                Teacher.getInfo(global_variables.HOST + '/api/v1/teachers?access_token=' + access_token,
                  function successCallback(results) {
                    $this.setState({processingCount:$this.state.processingCount+1});
                  },
                  function errorCallback(results) {
                    alert(results.msg);
                  });

                Parent.getInfo(global_variables.HOST + '/api/v1/parents?access_token=' + access_token,
                  function successCallback(results) {
                    $this.setState({processingCount:$this.state.processingCount+1});
                  },
                  function errorCallback(results) {
                    alert(results.msg);
                  });
           }
           clearInterval(interval_id);
         }, 300);
    }

    openClassModal() {
      this.refs.class_modal.open();
    }

    closeClassModal() {
      this.refs.class_modal.close();
      this.props.pushNewRoute('scannerOverlay');
    }

    openStudentModalAlpha() {
        VibrationIOS.vibrate();
        this.refs.student_modal_alpha.open();
        this.showModalCheckInTitleAnimation();
    }

    closeStudentModalAlpha() {
        this.refs.student_modal_alpha.close();
        //this.pushNewRoute('scannerOverlay');
    }

    openStudentModalBeta() {
        VibrationIOS.vibrate();
        this.refs.student_modal_beta.open();
        this.showModalCheckInTitleAnimation();
    }

    closeStudentModalBeta() {
        this.refs.student_modal_beta.close();
        //this.pushNewRoute('scannerOverlay');
    }


    // for showing the "簽到完成" (Check Success) Animation
    showModalCheckInTitleAnimation() {
      var $this = this;
      setTimeout(function(){
        $this.setState({isNewStudentModal: true});
      }, 200);
      setTimeout(function(){
        $this.setState({isNewStudentModal: false});
      }, 1000);
    }

    modalAnimation() {
      var $this = this;
      // check if first time to open student modal
      if(this.state.isOpenStudentModalAlpha == false && this.state.isOpenStudentModalBeta == false)
      {
        // alert('first');
        this.setState({isOpenStudentModalAlpha: true});
        this.setState({isNewStudentModal: true});
        $this.openStudentModalAlpha();
      }
      // Alpha Modal (Switchable)
      else if(this.state.isOpenStudentModalAlpha == true)
      {
        this.closeStudentModalAlpha();
        setTimeout(function(){
          $this.openStudentModalBeta();
          $this.setState({isNewStudentModal: true});
        },200);
        this.setState({isOpenStudentModalBeta: true});
        this.setState({isOpenStudentModalAlpha: false});
      }
      // Beta Modal (Switchable)
      else if(this.state.isOpenStudentModalBeta == true)
      {
        this.closeStudentModalBeta();
        setTimeout(function() {
          $this.openStudentModalAlpha();
        },200);
        this.setState({isOpenStudentModalAlpha: true});
        this.setState({isOpenStudentModalBeta: false});
      }
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    popRoute() {
        this.props.popRoute();
    }

    getClassCurrentAttendance(){

      // add temp code here
      let realm = new Realm({schema: realm_schema});
      // get all student IDs and save in array
      var temp = realm.objects('AttendanceModel').sorted('i_arrived_at', true);
      if (temp.length == 0)
        return;

      var temp_2 = realm.objects('KlassModel').filtered('s_klass_id = "' + temp[0].s_klass_id + '"');
      if (temp_2.length == 0)
        return;

      var temp_course = realm.objects('CourseStudentModel').filtered('s_course_id = "' + temp_2[0].s_course_id + '"');
      if (temp_course.length == 0)
        return;

      temp_course = temp_course[0];
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
      this.setState({student_arrivals:temp_arrived_count}); // 抵達
      this.setState({student_leaves:temp_leave_count}); // 請假
      this.setState({student_absent:temp_absent_count}); // 未到
    }

    onBarCodeRead(result) {

      if (canScan && this.barCodeData != null && this.barCodeData != result.data) {
        canScan = false;

        this.barCodeData = result.data;
          let realm = new Realm({schema: realm_schema});
          // get user access token
          var users = realm.objects('UserModel').sorted('i_login_at', true);
          var current_user = users[users.length-1];
          var access_token = current_user.s_access_token;

          realm.write(() => {
            current_user.i_scannerUsage += 1;
          });

          // // check if scanned qr code is student's qrcode
          // var students = realm.objects('StudentModel');
          // // if not student qr code, don't call API
          // if(!$this.isStudentQrCode(students, $this.barCodeData)){
          //   clearInterval(Id);
          //   alert('not student qr code. ' + $this.barCodeData);
          //   return;
          // }

          var $this = this;

          Teacher.checkIn($this.barCodeData, 'scan_qr_code', global_variables.HOST + '/api/v1/attendances/checkin?access_token=' + access_token,
            function successCallback(results) {
              count = parseInt(results.count);
              interval_id = setInterval(function(){
                let realm = new Realm({schema: realm_schema});
                if(count == realm.objects('AttendanceModel').length){
                  //$this.setState({isCheckRealmOK: true});
                  $this.fetch_for_modal();
                }
              }, 200);

            },
            function errorCallback(results) {
              //AlertIOS.prompt('qr code is not a student qr code or the code has already been scanned. This qr code is: ' + $this.barCodeData)
              //canScan = true;

              AlertIOS.alert(
               'qr code is not a student qr code or the code has already been scanned.',
               '',
               [
                 {text: 'OK', onPress: () => canScan = true, style: 'cancel'},
               ],
              );

              clearInterval(interval_id);
            });
      } // end of if qr code dupe check
    } // end of onBarCodeRead()

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


    // isStudentQrCode(students, barCodeData){
    //   var studentQrCode = false;
    //
    //   for (var i = 0; i < students.length; i++){
    //     console.log('students= ' + students[i].s_student_qrCode + ', barcodedata= '+ barCodeData);
    //     if(students[i].s_student_qrCode == barCodeData){
    //       studentQrCode = true;
    //     }
    //   }
    //
    //   return studentQrCode;
    // }

    render() {
      this.barCodeFlag = true;
        return (
                  <View>
                    <Header style={{backgroundColor:'#f5f6f7'}}>
                      <Button
                        transparent
                        onPress={this.props.openDrawer}>
                        <Image source={require('../../../images/menu/btn_menu.png')}/>
                      </Button>
                      <Image style={{alignSelf:'center'}}source={require('../../../images/scanner/ic_tmot_scan.png')}/>
                      <Button
                         transparent
                         onPress={() => this.pushNewRoute('notifications')}>
                         {(this.state.badgeCount == 0)?<Image source={require('../../../images/notification/btn_notification.png')}/>:<Badge>{this.state.badgeCount}</Badge>}
                       </Button>
                    </Header>
                    {(this.state.processingCount < 8)?<View style={styles.processing}><Spinner color='#000'/><Text>正在處理中...</Text></View>:
                      <Camera
                        onBarCodeRead={this.onBarCodeRead}
                        style={styles.camera}>
                        <View style={styles.rectangleContainer}>
                          <View style={styles.markerTop}>
                            <Image
                            source={require('../../../images/marker/qrcodescannermarker.png')}
                            style={styles.markerTopLeft}>
                          </Image>
                          <Image
                          source={require('../../../images/marker/qrcodescannermarker.png')}
                          style={styles.markerTopRight}>
                        </Image>
                      </View>
                      <View style={styles.markerBottom}>
                        <Image
                        source={require('../../../images/marker/qrcodescannermarker.png')}
                        style={styles.markerBottomLeft}>
                      </Image>
                      <Image
                      source={require('../../../images/marker/qrcodescannermarker.png')}
                      style={styles.markerBottomRight}>
                    </Image>
                  </View>
                </View>
                <Modal style={styles.class_modal} backdrop={false} ref={"class_modal"} swipeToClose={false} position="bottom" entry="bottom">
                    <Card style={styles.space}>
                      <Text style={styles.modalTitleCh}>兒童英文初級對話</Text>
                        <View style={{flexDirection:'column',paddingTop:20}}>
                          <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                          <View>
                            <Text style={styles.arriveTxtCh}>抵達</Text>
                            <Text style={styles.arriveNum}>{this.state.student_arrivals}</Text>
                          </View>
                          <View >
                            <Text style={styles.abscenceTxtCh}>請假</Text>
                            <Text style={styles.abscenceNum}>{this.state.student_leaves}</Text>
                          </View>
                          <View style={{borderWidth:0}}>
                            <Text style={styles.leaveTxtCh}>未到</Text>
                            <Text style={styles.leaveNum}>{this.state.student_absent}</Text>
                          </View>
                          </View>
                          <Button rounded style={styles.btn} onPress={this.closeClassModal.bind(this)} >
                            <Text style={styles.btnTxtCh}>未到名單</Text>
                          </Button>
                        </View>
                    </Card>
                </Modal>
              <Modal style={styles.student_modal} backdrop={false} ref={"student_modal_alpha"} swipeToClose={false} position="bottom" entry="bottom">
                  <Card style={this.state.studentModalStyleAlpha}>
                    {this.state.isNewStudentModal?
                      <View style={{backgroundColor:'#fec154'}}><Text style={styles.newModaltxt}>簽到完成</Text></View>
                      :<View style={{height:20}}></View>
                    }
                      <View style={{flexDirection:'row',paddingTop:20}}>
                        <Thumbnail size={135} style={styles.circleAvatar} circular source={require('../../../images/contacts/atul.png')} />
                        <View style={{flexDirection:'column'}}>
                          <Button transparent><Text style={styles.studentModalName}>{this.state.name}</Text></Button>
                          <Text style={styles.studentModalStatus}>{this.state.status}</Text>
                          <Text style={styles.studentModalArrivalTime}>{this.state.arrived_at}</Text>
                        </View>
                      </View>
                  </Card>
              </Modal>
              <Modal style={styles.student_modal} backdrop={false} ref={"student_modal_beta"} swipeToClose={false} position="bottom" entry="bottom">
                  <Card style={this.state.studentModalStyleBeta}>
                    {this.state.isNewStudentModal?
                      <View style={{backgroundColor:'#fec154'}}><Text style={styles.newModaltxt}>簽到完成</Text></View>
                      :<View style={{height:20}}></View>
                    }
                      <View style={{flexDirection:'row',paddingTop:20}}>
                        <Thumbnail size={135} style={styles.circleAvatar} circular source={require('../../../images/contacts/atul.png')} />
                        <View style={{flexDirection:'column'}}>
                          <Button transparent><Text style={styles.studentModalName}>{this.state.name}</Text></Button>
                          <Text style={styles.studentModalStatus}>{this.state.status}</Text>
                          <Text style={styles.studentModalArrivalTime}>{this.state.arrived_at}</Text>
                        </View>
                      </View>
                  </Card>
              </Modal>
              </Camera>}
          </View>
        )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route)),
        popRoute: ()=> dispatch(popRoute()),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(Scanner);
