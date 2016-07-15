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
import { Image, View,VibrationIOS } from 'react-native';

import {Container, Header, Title, Content, Text, Button, Icon, List, ListItem, Footer} from 'native-base';
import FooterComponent from "./../footer";

import theme from '../../themes/base-theme';
import styles from './styles';
import Camera from 'react-native-camera';

class Home extends Component {

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    popRoute() {
        this.props.popRoute();
    }

    onBarCodeRead(result) {
      var $this = this;
      alert('onBarCodeRead');
      if (this.barCodeFlag) {
        this.barCodeFlag = false;

        setTimeout(()=>{
          VibrationIOS.vibrate();
          alert('hihi');
          $this.props.onSuccess(result.data);
        }, 1000);
      }
    }

    render() {
        this.barCodeFlag = true;
        return (
            <View style={{backgroundColor: '#fff'}}>
                <Header>
                    <Button transparent onPress={this.props.openDrawer}>
                        <Icon name="ios-menu" />
                    </Button>
                    <View />
                    <Button transparent>
                      <Icon name="ios-alert" />
                    </Button>
                </Header>
                <Camera onBarCodeRead={this.onBarCodeRead} style={styles.camera}>
                  <View style={styles.rectangleContainer}>

                  </View>
                </Camera>
            </View>
        )
    }
}

function bindAction(dispatch) {
    return {
        openDrawer: ()=>dispatch(openDrawer()),
        popRoute: () => dispatch(popRoute()),
        replaceRoute:(route)=>dispatch(replaceRoute(route))
    }
}

export default connect(null, bindAction)(Home);
