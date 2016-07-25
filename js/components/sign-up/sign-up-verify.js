/**
 * Created by kylefang on 4/28/16.
 * @flow
 */

'use strict';
//Currently using it as playground

import React, {Component} from 'react';
import {connect} from 'react-redux';
// import CodePush from 'react-native-code-push';
import { Image } from 'react-native';
import {popRoute} from '../../actions/route';
import {replaceOrPushRoute} from '../../actions/route';
import {Container, Header, Title, Content, Text, Button, Icon, InputGroup, Input, View } from 'native-base';
import theme from '../../themes/base-theme';
import schema from '../../realm_schema';
import styles from './styles';
import signup from './signup-theme';

const Realm = require('realm');
const {User} = require('NativeModules');

class SignUpVerify extends Component {

  constructor(props) {
      super(props);
      this.state = {
          code: ''
      };
      this.onNextPressed = this.onNextPressed.bind(this);
  }

    popRoute() {
        this.props.popRoute();
    }

    navigateTo(route) {
       this.props.replaceOrPushRoute(route);
    }

    onNextPressed(){
      var $this = this;
      User.checkVerificationCode(this.state.code, 'http://192.168.11.48:3000/api/v1/signup/check_verification_code',
       function successCallback(results) {
           alert(results.success);
           //$this.props.replaceOrPushRoute(route);
       },
       function errorCallback(results) {
           alert(results.msg);
       });
    }

    render() {
        return (
          <Container theme={theme} style={{backgroundColor:'#ffffff'}}>
            <Content
              theme={signup}
              style={{backgroundColor: '#f5f6f7'}}
              scrollEnabled={this.state.scroll}>
              <Image source={require('../../../images/tmot_logo/ic_tmot_logo.png')} style={{alignSelf:'center',marginTop:105}} />
              <Text style={styles.newAccountTxt}>創建新帳號</Text>
              <View style={styles.bg}>
                <View style={styles.mb20}>
                    <Input placeholder="驗證碼" onChangeText={(code) => this.setState({code})} value={this.state.code} />
                    <Text>{this.state.client_error_msg}</Text>
                  </View>
                  <Button transparent rounded style={styles.getVerifyBtn} onPress={this.onNextPressed}>
                    <Text style={styles.verifyTxt}>驗證驗證碼</Text>
                  </Button>
              </View>
            </Content>
          </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        popRoute: () => dispatch(popRoute()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route))
    }
}

export default connect(null, bindAction)(SignUpVerify);
