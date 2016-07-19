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
import {Container, Header, Title, Content, Text, Button, Icon, List, ListItem, Footer} from 'native-base';
import FooterComponent from "./../footer";

import theme from '../../themes/base-theme';
import styles from './styles';
import Camera from 'react-native-camera';
import Modal from 'react-native-modalbox';

class Scanner extends Component {
  constructor(props){
     super(props);
     this.onBarCodeRead = this.onBarCodeRead.bind(this);
     this.openModal = this.openModal.bind(this);
     this.barCodeData = "";
     this.state = {
         swipeToClose: true,
         studentInfo: "",
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
                  <View style={{backgroundColor: '#fff'}}>
                    <Header>
                      <Button
                        transparent
                        onPress={this.props.openDrawer}>
                        <Icon name="ios-menu" />
                      </Button>
                      <View />
                      <Button transparent>
                        <Icon name="ios-alert" />
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
                  <View style={styles.space}>
                      <Text style={{color: '#050'}}>
                          {this.state.studentInfo}
                      </Text>
                  </View>
              </Modal>
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
