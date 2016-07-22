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

                      <Button
                        transparent
                        onPress={this.props.openDrawer}>
                        <Icon name="ios-menu" />
                      </Button>
                      <View />
                      <Button
                        transparent
                        onPress={() => this.replaceRoute('notifications')}>
                        <Icon name="md-notifications" />
                      </Button>
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
                      <Text style={{color: '#050'}}>
                          {this.state.studentInfo}
                      </Text>
                      <Button transparent style={{position: 'absolute', top: 0, right: 0}} onPress={this.closeModal.bind(this)} >
                        <Icon name="ios-keypad" style={{color:'#000'}} />
                      </Button>
                  </Card>
              </Modal>
              <Overlay isVisible={this.state.isOverlay}>
                <View style={styles.overlay}>
                  <ScrollView contentContainerStyle={{}}>
                    <Grid style={{height:300}}>
                        <Col style={{ backgroundColor: '#D954D7', height: 200 }}>
                          <Row>
                          <Thumbnail source={require('../../../images/contacts/sanket.png')} />
                            <Text>Card Header</Text>
                          </Row>
                          <Row>
                          <Thumbnail source={require('../../../images/contacts/sanket.png')} />
                            <Text>Card Header</Text>
                          </Row>
                          <Row>
                          <Thumbnail source={require('../../../images/contacts/sanket.png')} />
                            <Text>Card Header</Text>
                          </Row>
                        </Col>
                        <Col style={{ backgroundColor: '#D93735', height: 200 }}>
                          <Thumbnail source={require('../../../images/contacts/sanket.png')} />
                            <Text>
                                //Your text here
                            </Text>
                        </Col>
                        <Col style={{ backgroundColor: '#D954D7', height: 200 }}>
                          <Thumbnail source={require('../../../images/contacts/sanket.png')} />
                            <Text>Card Footer</Text>
                        </Col>
                   </Grid>
                    <Button onPress={this.closeOverlay.bind(this)}>TTTTT</Button>
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
