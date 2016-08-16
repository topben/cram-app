/**
 * Created by kylefang on 4/28/16.
 * @flow
 */

'use strict';
//Currently using it as playground

import React, {Component} from 'react';
import {connect} from 'react-redux';
// import CodePush from 'react-native-code-push';
import { Image ,TextInput, Dimensions, DeviceEventEmitter, Keyboard, Alert } from 'react-native';
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

var interval_id = 0;

class SignUpCreate extends Component {

  constructor(props) {
      super(props);
      this.state = {
          password: '',
          re_password: '',
          verifyPwdMsg: '',
          checkPwdMsg: '',
          newHeight: 0,
          isBtnDisabled: false,
          isPwdOK: false,
          isLeastEightChar: false,
          isLeastOneSymbol: false,
          isLeastOneUppercase: false,
          isMixNumberAlphabet: false
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

    checkPassword(password){
      if(password.length < 8) {
        this.setState({isLeastEightChar: false});
        //alert("Error: Password must contain at least six characters!");
      } else {
        this.setState({isLeastEightChar: true})
      }

      // var re_special = /[@#$%^&+=]/
      // if(!re_special.test(password)){
      //   this.setState({isLeastOneSymbol: false});
      // } else {
      //   this.setState({isLeastOneSymbol: true});
      // }

      var re_uppercase = /[A-Z]/;
      if(!re_uppercase.test(password)) {
        //alert("Error: password must contain at least one uppercase letter (A-Z)!");
        this.setState({isLeastOneUppercase: false});
      } else {
        this.setState({isLeastOneUppercase: true});
      }

      var re_number = /[0-9]/;
      var re_lowercase = /[a-z]/;

      if(!re_number.test(password) || re_lowercase.test(password)) {
        //alert("Error: password must contain at least one lowercase letter (a-z)!");
        this.setState({isMixedNumAlphabet: false});
      } else {
        this.setState({isMixedNumAlphabet: true});
      }
      //
      // if(this.state.isLeastEightChar && this.state.isLeastOneSymbol && this.state.isLeastOneUppercase && this.state.isMixedNumAlphabet)
      // {
      //   this.setState({isPwdOK: true});
      // } else {
      //   this.setState({isPwdOK: false});
      // }

      this.setState({password:password})
    }

    // next button tapped
    onNextPressed(){
      var $this = this;
      if(this.state.password == this.state.re_password && this.state.password == "")
      {
        Alert.alert(
          '',
          '密碼輸入空白，請重新輸入',
          [
            {text: 'OK', onPress: () => {}}
          ]
        )
        //alert("未輸入密碼");
        return;
      }

      if(this.state.password != this.state.re_password)
      {
        Alert.alert(
          '',
          '密碼輸入錯誤，請重新輸入',
          [
            {text: 'OK', onPress: () => {}}
          ]
        )
        //alert("密碼不一致");
        return;
      }

      // disable button to prevent rapidly tapping
      this.setState({isBtnDisabled: true});

      let realm = new Realm({schema: realm_schema});
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

      var $this = this;
      var $person = person;

      realm.write(() => {
        let allUsers = realm.objects('UserModel');
        realm.delete(allUsers); // Deletes all books
      });

      User.create(userInfo, global_variables.HOST+'/api/v1/signup',
       function successCallback(results) {
         interval_id = setInterval(function(){
           let realm = new Realm({schema: realm_schema});
           if(realm.objects('UserModel').length == 1){

             User.login($person.s_email, $this.state.password, 'password', global_variables.HOST+'/oauth/token',
               function successCallback(results){
                 if($this.state.isPwdOK)
                 {
                   clearInterval(interval_id);
                   // navigate to scanner page
                   $this.navigateTo('scanner');
                 }
                 // enable and release button lock
                 $this.setState({isBtnDisabled: false});
               },
               function failureCallback(results){
                 // enable and release button lock
                 $this.setState({isBtnDisabled: false});
               });
           }
         }, 200);
       },
       function errorCallback(results) {
         // enable and release button lock
         $this.setState({isBtnDisabled: false});
         Alert.alert(
           '',
           result.msg,
           [
             {text: 'OK', onPress: () => {}}
           ]
         )
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
                    onChangeText={(password) => this.checkPassword(password)}
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
                  <View style={{alignSelf:'center',flexDirection:'column'}}>
                    <View style={{paddingRight:20}}><Text style={styles.limitationTxt}>  密碼設定需符合:</Text></View>
                    <View style={{flexDirection:'row'}}>{this.state.isLeastEightChar?<Text>OK</Text>:<Text>不OK</Text>}<Text style={styles.limitationTxt}>  至少八個字元</Text></View>
                    <View style={{flexDirection:'row'}}>{this.state.isLeastOneUppercase?<Text>OK</Text>:<Text>不OK</Text>}<Text style={styles.limitationTxt}>  至少1個大寫英文字母</Text></View>
                    </View>
                <Button
                  transparent
                  rounded
                  disabled={this.state.isBtnDisabled}
                  style={styles.getVerifyBtn}
                  onPress={this.onNextPressed}>
                  <View>
                    <Text style={styles.verifyTxt}>完成</Text>
                  </View>
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
