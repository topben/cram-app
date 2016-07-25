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

    static propTypes = {
    };

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
        setTimeout(function() {
          $this.setState({studentInfo: result.data});
          $this.openModal();
        }, 500);
      }
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