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
import {pushNewRoute,popRoute} from '../../actions/route';
import {closeDrawer} from '../../actions/drawer';
import {replaceOrPushRoute} from '../../actions/route';
import {Container, Header, Title, Content, Text, Button, Icon, InputGroup, Input, View } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';
import signup from './signup-theme';

const {User} = require('NativeModules');
const Realm = require('realm');

class SignUpCreate extends Component {

  constructor(props) {
      super(props);
      this.onNextPressed = this.onNextPressed.bind(this);
      this.state = {
          password: '',
          re_password: '',
          verifyPwdMsg: '',
          checkPwdMsg: ''
      };
  }

    pushNewRoute(route) {
         this.props.pushNewRoute(route);
    }

    popRoute() {
        this.props.popRoute();
    }

    navigateTo(route) {
        this.props.replaceOrPushRoute(route);
    }

    // next button tapped
    onNextPressed(){

      if(this.state.password == this.state.re_password && this.state.password == "")
      {
        alert("未輸入密碼");
        return;
      }

      if(this.state.password != this.state.re_password)
      {
        alert("密碼不一致");
        return;
      }
      //this.setState({client_error_msg: '成功'});
      this.props.pushNewRoute('edit');
    }

    render() {
      console.log(Realm.defaultPath);
        return (
          <View style={{flex:1,backgroundColor:'#f5f6f7'}}>
            <Button
              transparent
              style={{marginTop:theme.headerBtnMarginTop}}
              onPress={() => this.popRoute()}>
              <Image source={require('../../../images/button/btn_back.png')}/>
            </Button>
            <Content
              theme={signup}
              style={{backgroundColor: '#f5f6f7'}}
              scrollEnabled={this.state.scroll}>
              <Text style={styles.newAccountTxt}>設定新帳號</Text>
              <View style={styles.bg}>
                <View style={styles.mb20}>
                  <Input
                    placeholder="原始密碼"
                    secureTextEntry={true}
                    onChangeText={(password) => this.setState({password})}
                    value={this.state.password} />
                </View>
                <Text style={styles.verifyPwd}>{this.state.verifyPwdMsg}</Text>
                  <View style={styles.mb20}>
                    <Input
                      placeholder="重複密碼"
                      secureTextEntry={true}
                      onChangeText={(re_password) => this.setState({re_password})}
                      value={this.state.re_password} />
                  </View>
                  <Text style={styles.checkPwd}>{this.state.checkPwdMsg}</Text>
                <Button
                  transparent
                  rounded
                  style={styles.getVerifyBtn}
                  onPress={this.onNextPressed}>
                  <Text style={styles.verifyTxt}>下一步</Text>
                </Button>
              </View>
            </Content>
          </View>
        )
    }
}

function bindAction(dispatch) {
    return {
        popRoute: () => dispatch(popRoute()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route)),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route))
    }
}

export default connect(null, bindAction)(SignUpCreate);
