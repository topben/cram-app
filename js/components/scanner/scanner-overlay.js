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

class ScannerOverlay extends Component {
  constructor(props){
     super(props);
     this.onBarCodeRead = this.onBarCodeRead.bind(this);
     this.openModal = this.openModal.bind(this);
     this.barCodeData = "";
     this.state = {
         swipeToClose: true,
         studentInfo: ""
       };
    }

    // synchronize front/backend DB here.. call ALL 'GET APIs'
    componentWillMount () {

         console.log('path = ' + Realm.defaultPath);

         let realm = new Realm({schema: [realm_schema.UserModel, realm_schema.StudentModel]});

         // get user access token
         var users = realm.objects('UserModel').sorted('i_login_at', true);
         var access_token = users[users.length-1].s_access_token;

         console.log('access_token = ' + access_token);
    }

    openModal() {
        VibrationIOS.vibrate();
        this.refs.modal.open();
    }

    closeModal() {
        this.refs.modal.close();
        this.setState({isOverlay: true});
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

    onBarCodeRead(result) {
      var $this = this;

      if ($this.barCodeData != result.data) {
        $this.barCodeData = result.data;

        var Id = setInterval(function(){

          if($this.barCodeData == null)
            return;
          // var $schema = realm_schema;
          $this.setState({studentInfo: result.data});

          let realm = new Realm({schema: [realm_schema.UserModel, realm_schema.StudentModel]});
          // get user access token
          var users = realm.objects('UserModel').sorted('i_login_at', true);
          var current_user = users[users.length-1];
          var access_token = current_user.s_access_token;

          realm.write(() => {
            current_user.i_scannerUsage += 1;
          });

          Teacher.checkIn($this.barCodeData, 'scan_qr_code', global_variables.HOST + '/api/v1/attendances/checkin?access_token=' + access_token,
            function successCallback(results) {
              let realm = new Realm({schema: [realm_schema.UserModel, realm_schema.StudentModel]});
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

    render() {
      this.barCodeFlag = true;
        return (
              <View style={{flex:1,backgroundColor:'#f5f6f7'}}>
                <View style={styles.overlay}>
                  <ScrollView contentContainerStyle={{paddingTop:20}}>
                    <Button transparent style={{alignSelf:'flex-end'}}
                      onPress={() => this.popRoute()}>
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
