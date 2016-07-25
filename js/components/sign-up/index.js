/**
 * Created by kylefang on 4/28/16.
 * @flow
 */

'use strict';
//Currently using it as playground

import React, {Component} from 'react';
import {connect} from 'react-redux';
// import CodePush from 'react-native-code-push';
import { Image ,TextInput } from 'react-native';
import {popRoute} from '../../actions/route';
import {replaceOrPushRoute} from '../../actions/route';
import {Container, Header, Title, Content, Text, Button, Icon, InputGroup, Input, View } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';
import signup from './signup-theme';

const {User} = require('NativeModules');
const Realm = require('realm');

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.onNextPressed = this.onNextPressed.bind(this);
        this.state = {
            phone: '',
            client_error_msg: ''
        };
    }

    popRoute() {
        this.props.popRoute();
    }

    navigateTo(route) {
        this.props.replaceOrPushRoute(route);
    }

    isNormalInteger(str) {
        var n = ~~Number(str);
        return String(n) === str && n >= 0;
    }

    // check phone number
    isPhoneNumber(inputtxt)
    {
      var phoneno = /^\d{10}$/;
      if(inputtxt.match(phoneno))
      {
        return true;
      }
      else
      {
        this.setState({client_error_msg: '電話規格錯誤'});
        return false;
      }
    }

    // next button tapped
    onNextPressed(){
      var $this = this;
      if(this.isPhoneNumber(this.state.phone)==false)
      {
        return;
      }

      var first_two_phone_numbers = this.state.phone.substring(0, 2);
      if(first_two_phone_numbers != '09')
      {
        this.setState({client_error_msg: '需要09開頭'});
        return;
      }

      var phoneWithCountryCode = '886' + this.state.phone.substring(1, 10);

      User.sendVerificationCode(phoneWithCountryCode, 'http://192.168.11.48:3000/api/v1/signup/send_verification_code_sms',

       function successCallback(results) {
          //$this.navigateTo('signUpVerify');
       },

       function errorCallback(results) {
           alert(results.msg);
       });
       this.navigateTo('signUpVerify');
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
                      <Input placeholder="手機號碼" onChangeText={(phone) => this.setState({phone})} value={this.state.phone} />
                      <Text>{this.state.client_error_msg}</Text>
                    </View>
                    <Button transparent rounded style={styles.getVerifyBtn} onPress={this.onNextPressed}>
                      <Text style={styles.verifyTxt}>取得驗證碼</Text>
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

export default connect(null, bindAction)(SignUp);
