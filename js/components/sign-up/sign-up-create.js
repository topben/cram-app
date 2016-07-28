/**
 * Created by kylefang on 4/28/16.
 * @flow
 */

'use strict';
//Currently using it as playground

import React, {Component} from 'react';
import {connect} from 'react-redux';
// import CodePush from 'react-native-code-push';
import { Image ,TextInput, Dimensions, DeviceEventEmitter, Keyboard } from 'react-native';
import {pushNewRoute,popRoute} from '../../actions/route';
import {closeDrawer} from '../../actions/drawer';
import {replaceOrPushRoute} from '../../actions/route';
import {Container, Header, Title, Content, Text, Button, Icon, InputGroup, Input, View } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';
import signup from './signup-theme';
import global_variables from '../../global_variables';
import realm_schema from '../../realm_schema';

const {User} = require('NativeModules');
const Realm = require('realm');

class SignUpCreate extends Component {

  constructor(props) {
      super(props);
      this.state = {
          password: '',
          re_password: '',
          verifyPwdMsg: '',
          checkPwdMsg: '',
          newHeight: 0
      };
      this.onNextPressed = this.onNextPressed.bind(this);
  }

  componentWillMount () {
      Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
      Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
      // Create Realm
      // let realm = new Realm({schema: [realm_schema.People]});
      // // get realm object
      // let people = realm.objects('People');
      // alert(people.s_verificationCode)
  }

    keyboardWillShow (e) {
        let newSize = Dimensions.get('window').height - e.endCoordinates.height;
        this.setState({newHeight: newSize});
    }

    keyboardWillHide (e) {
        this.setState({newHeight: 0});
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
      var $this = this;
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

      let realm = new Realm({schema: [realm_schema.People]});
      // get realm object
      let people = realm.objects('People');
      let person = people[people.length - 1];

      // var $this = this;
      console.warn(this.state.password);
      // realm.write(() => {
      //   person.s_password = this.state.password
      // });

      var userInfo = {
      	password : this.state.password,
      	email    : person.s_email,
      	phone    : person.s_phone
      };

      User.create(userInfo, global_variables.HOST+'/api/v1/signup',
       function successCallback(results) {
         // navigate to scanner page
          $this.navigateTo('scanner');
       },
       function errorCallback(results) {
           alert(results.msg);
       });
      // this.props.pushNewRoute('edit');
    }

    render() {
      //console.log(Realm.defaultPath);
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
              >
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
