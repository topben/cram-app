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
         test: ''
       };
    }

    // synchronize front/backend DB here.. call ALL 'GET APIs'
    componentWillMount () {

        //  console.log('path = ' + Realm.defaultPath);
         //
        //  let realm = new Realm({schema: [realm_schema.UserModel, realm_schema.StudentModel]});
         //
        //  // get user access token
        //  var users = realm.objects('UserModel').sorted('i_login_at', true);
        //  var access_token = users[users.length-1].s_access_token;
        // console.log('access_token = ' + access_token);
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
                        <Text style={styles.modalTitleCh}>兒童英文初級對話</Text>
                        <Text style={styles.subtitle}>向日葵補習班</Text>
                        <Text style={styles.subtitle}>10:AM ~ 11:AM</Text>
                        <View style={{flexDirection:'row',justifyContent:'space-around',padding:20}}>
                          <View>
                                    <Text style={styles.arriveTxtCh}>抵達</Text>
                                    <Text style={styles.arriveNum}>3</Text>
                          </View>
                          <View>
                                    <Text style={styles.abscenceTxtCh}>請假</Text>
                                    <Text style={styles.abscenceNum}>2</Text>
                          </View>
                          <View>
                                    <Text style={styles.leaveTxtCh}>未到</Text>
                                    <Text style={styles.leaveNum}>17</Text>
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
