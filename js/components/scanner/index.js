/**
 * Created by kylefang on 4/28/16.
 * @flow
 */

'use strict';
//Currently using it as playground

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {openDrawer} from '../../actions/drawer';
import {popRoute, replaceRoute} from '../../actions/route';
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

class Scanner extends Component {
  constructor(props){
     super(props);
     this.onBarCodeRead = this.onBarCodeRead.bind(this);
     this.openModal = this.openModal.bind(this);
     this.barCodeData = "";
     this.state = {
         swipeToClose: true,
         studentInfo: "",
         isOverlay: false
       };
    }

    // synchronize front/backend DB here.. call ALL 'GET APIs'
    componentWillMount () {

         console.log('path = ' + Realm.defaultPath);

         let realm = new Realm({schema: [realm_schema.UserModel, realm_schema.NotificationModel, realm_schema.StudentModel, realm_schema.CourseModel, realm_schema.AttendanceModel, realm_schema.KlassModel]});

         // get user access token
         var users = realm.objects('UserModel').sorted('i_login_at', true);
         var access_token = users[users.length-1].s_access_token;

         console.log('access_token = ' + access_token);

         // perform api calls
         User.getInfo(global_variables.HOST + '/api/v1/me?access_token=' + access_token,
           function successCallback(results) {
           },
           function errorCallback(results) {
             alert(results.msg);
           });

          Student.getInfo(global_variables.HOST + '/api/v1/students?access_token=' + access_token,
            function successCallback(results) {
            },
            function errorCallback(results) {
              alert(results.msg);
            });

          Course.getInfo(global_variables.HOST + '/api/v1/courses?access_token=' + access_token,
            function successCallback(results) {
            },
            function errorCallback(results) {
              alert(results.msg);
            });

          Notification.getInfo(global_variables.HOST + '/api/v1/notifications?access_token=' + access_token,
            function successCallback(results) {
            },
            function errorCallback(results) {
              alert(results.msg);
            });

          Attendance.getInfo(global_variables.HOST + '/api/v1/attendances?access_token=' + access_token,
            function successCallback(results) {
            },
            function errorCallback(results) {
              alert(results.msg);
            });

          Klass.getInfo(global_variables.HOST + '/api/v1/classes?access_token=' + access_token,
            function successCallback(results) {
            },
            function errorCallback(results) {
              alert(results.msg);
            });
    }

    openModal() {
        VibrationIOS.vibrate();
        this.refs.modal.open();
    }

    closeModal() {
        this.refs.modal.close();
        this.setState({isOverlay: true});
    }

    closeOverlay() {
        this.setState({isOverlay: false});
    }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    popRoute() {
        this.props.popRoute();
    }

    onBarCodeRead(result) {
      var $this = this;


      if ($this.barCodeData != result.data) {
        $this.barCodeData = result.data;

        var Id = setInterval(function(){

          if($this.barCodeData == null)
            return;
          // var $schema = realm_schema;
          $this.setState({studentInfo: result.data});

          let realm = new Realm({schema: [realm_schema.UserModel, realm_schema.NotificationModel, realm_schema.StudentModel, realm_schema.CourseModel, realm_schema.AttendanceModel, realm_schema.KlassModel]});
          // get user access token
          var users = realm.objects('UserModel').sorted('i_login_at', true);
          var current_user = users[users.length-1];
          var access_token = current_user.s_access_token;

          realm.write(() => {
            current_user.i_scannerUsage += 1;
          });

          // check if scanned qr code is student's qrcode
          var students = realm.objects('StudentModel');
          // if not student qr code, don't call API
          if(!isStudentQrCode(students))
            return;

          Teacher.checkIn($this.barCodeData, 'scan_qr_code', global_variables.HOST + '/api/v1/attendances/checkin?access_token=' + access_token,
            function successCallback(results) {

              let realm = new Realm({schema: [realm_schema.UserModel, realm_schema.NotificationModel, realm_schema.StudentModel, realm_schema.CourseModel, realm_schema.AttendanceModel, realm_schema.KlassModel]});
              var studentModel = realm.objects('StudentModel').filtered('s_student_qrCode = "' + $this.barCodeData + '"')[0];
              alert(studentModel.s_name + ' checked in successfully!');
              clearInterval(Id);
            },
            function errorCallback(results) {
              alert(result.msg)
              clearInterval(Id);
            });

        },500); // end of setInterval()

      } // end of if qr code dupe check
    } // end of onBarCodeRead()

    isStudentQrCode(students){
      var studentQrCode = false;

      for (student in students){
        if(student.s_student_qrCode == $this.barCodeData){
          return true;
        }
      }

      return false;
    }

    render() {
      this.barCodeFlag = true;
        return (
                  <View style={{flex:1,backgroundColor:'#f5f6f7'}}>
                    <Header style={{backgroundColor:'#f5f6f7'}}>
                      <Button
                        transparent
                        onPress={this.props.openDrawer}>
                        <Image source={require('../../../images/menu/btn_menu.png')}/>
                      </Button>
                      <Image style={{alignSelf:'center'}}source={require('../../../images/scanner/ic_tmot_scan.png')}/>
                       <Button
                         transparent
                         onPress={() => this.replaceRoute('notifications')}>
                         <Image source={require('../../../images/notification/btn_notification.png')}/>
                       </Button>
                    </Header>
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
              <Modal style={styles.modal} backdrop={false} ref={"modal"} swipeToClose={true} position="bottom" entry="bottom">
                  <Card style={styles.space}>
                      <Text style={styles.modalTitleCh}>兒童英文初級對話</Text>
                      <View style={{flexDirection:'row',paddingTop:20}}>
                        <CardItem padder>
                                  <Text style={styles.arriveTxtCh}>抵達</Text>
                                  <Text style={styles.arriveNum}>3</Text>
                        </CardItem>
                        <CardItem padder>
                                  <Text style={styles.abscenceTxtCh}>請假</Text>
                                  <Text style={styles.abscenceNum}>2</Text>
                        </CardItem>
                        <CardItem padder>
                                  <Text style={styles.leaveTxtCh}>未到</Text>
                                  <Text style={styles.leaveNum}>17</Text>
                        </CardItem>
                      </View>
                      <Button rounded style={styles.btn} onPress={this.closeModal.bind(this)} >
                        <Text style={styles.btnTxtCh}>未到名單</Text>
                      </Button>
                  </Card>
              </Modal>
              <Overlay isVisible={this.state.isOverlay}>
                <View style={styles.overlay}>
                  <ScrollView contentContainerStyle={{paddingTop:20}}>
                    <Button transparent style={{alignSelf:'flex-end'}}onPress={this.closeOverlay.bind(this)}>
                      <Image source={require('../../../images/button/btn_close.png')}/>
                    </Button>
                    <View style={styles.space}>
                        <Text style={styles.modalTitleCh}>兒童英文初級對話</Text>
                        <Text style={styles.subtitle}>向日葵補習班</Text>
                        <View style={{flexDirection:'row',paddingTop:20}}>
                          <CardItem padder>
                                    <Text style={styles.arriveTxtCh}>抵達</Text>
                                    <Text style={styles.arriveNum}>3</Text>
                          </CardItem>
                          <CardItem padder>
                                    <Text style={styles.abscenceTxtCh}>請假</Text>
                                    <Text style={styles.abscenceNum}>2</Text>
                          </CardItem>
                          <CardItem padder>
                                    <Text style={styles.leaveTxtCh}>未到</Text>
                                    <Text style={styles.leaveNum}>17</Text>
                          </CardItem>
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
              </Overlay>
            </Camera>
          </View>
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

export default connect(null, bindAction)(Scanner);
