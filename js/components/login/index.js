/**
 * Created by kylefang on 4/28/16.
 * @flow
 */

'use strict';
//Currently using it as playground

import React, {Component} from 'react';
import {connect} from 'react-redux';
// import CodePush from 'react-native-code-push';
import { DeviceEventEmitter, Dimensions, Image, Alert, Platform, Keyboard,PushNotificationIOS} from 'react-native';
import {pushNewRoute, replaceRoute} from '../../actions/route';

import global_variables from '../../global_variables';
import realm_schema from '../../realm_schema';
import {Container, Content, Text, InputGroup, Input, Button, Icon, View } from 'native-base';
import login from './login-theme';
import styles from './styles';
const Realm = require('realm');


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }
    // componentWillMount () {
    //     Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
    //     Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
    // }

    // keyboardWillShow (e) {
    //     let newSize = Dimensions.get('window').height - e.endCoordinates.height
    //     this.setState({scroll: true})
    // }

    // keyboardWillHide (e) {
    //     this.setState({scroll: false})
    // }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    pushNewRoute(route) {
         this.props.pushNewRoute(route);
    }

    componentWillMount(){
      // Add listener for push notifications
          PushNotificationIOS.addEventListener('notification', this._onNotification);
          // Add listener for local notifications
          PushNotificationIOS.addEventListener('localNotification', this._onLocalNotification);
    }

    componentWillUnmount() {
      // Remove listener for push notifications
      PushNotificationIOS.removeEventListener('notification', this._onNotification);
      // Remove listener for local notifications
      PushNotificationIOS.removeEventListener('localNotification', this._onLocalNotification);
    }

    // _sendNotification() {
    //   require('RCTDeviceEventEmitter').emit('remoteNotificationReceived', {
    //     aps: {
    //       alert: 'Sample notification',
    //       badge: '+1',
    //       sound: 'default',
    //       category: 'REACT_NATIVE'
    //     },
    //   });
    // }
    //
    // _sendLocalNotification() {
    //   require('RCTDeviceEventEmitter').emit('localNotificationReceived', {
    //     aps: {
    //       alert: 'Sample local notification',
    //       badge: '+1',
    //       sound: 'default',
    //       category: 'REACT_NATIVE'
    //     },
    //   });
    // }

          _onNotification(notification) {
            if(PushNotificationIOS.getInitialNotification(0)!= null)
              {
            Alert.alert(
              'Push Notification Received',
              'Alert message: ' + notification.getMessage(),
              [{
                text: 'Dismiss',
                onPress: null,
              }]
            );
          }
        PushNotificationIOS.setApplicationIconBadgeNumber(0);
      }

          // _onLocalNotification(notification){
          //   Alert.alert(
          //     'Local Notification Received',
          //     'Alert message: ' + notification.getMessage(),
          //     [{
          //       text: 'Dismiss',
          //       onPress: null,
          //     }]
          //   );
          // }

    render() {
        return (
          <Container>
            <Content
              style={{backgroundColor: '#f5f6f7',paddingTop:55}}
              theme={login}
              scrollEnabled={this.state.scroll}>
              <Image source={require('../../../images/tmot_logo/ic_tmot_logo.png')} style={{alignSelf:'center',marginTop:105}} />
              <Text style={styles.welcomeTxt}>WELCOME</Text>
              <View style={styles.bg}>
                <Button
                  rounded
                  style={styles.btn}
                  onPress={() => this.pushNewRoute('loginEmail')}>
                  <View>
                    <Text style={styles.phoneLoginTxt}>
                      電子信箱登入
                    </Text>
                  </View>
                </Button>
                <Button
                  transparent
                  style={{alignSelf:'center'}}
                  onPress={() => this.pushNewRoute('signUp')}>
                  <Text style={styles.registerTxt}>
                    創建新帳號
                  </Text>
                </Button>
              </View>
            </Content>
          </Container>
        )
    }
}



function bindActions(dispatch){
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route))
    }
}

export default connect(null, bindActions)(Login);
