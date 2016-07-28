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
import {replaceOrPushRoute} from '../../actions/route';
import {Container, Header, Title, Content, Text, Button, Icon, InputGroup, Input, View } from 'native-base';
import theme from '../../themes/base-theme';
import global_variables from '../../global_variables';
import realm_schema from '../../realm_schema';
import styles from './styles';
import signup from './signup-theme';

const {User} = require('NativeModules');
const Realm = require('realm');

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {
            phone: '',
            client_error_msg: '',
            newHeight: 0
        };
    }

    componentWillMount () {
        // keyboard events
        Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this));
        Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this));
        this.onNextPressed = this.onNextPressed.bind(this);
        this.pushNewRoute = this.pushNewRoute.bind(this);
        console.log(Realm.defaultPath);
    }

    keyboardWillShow (e) {
        let newSize = Dimensions.get('window').height - e.endCoordinates.height;
        this.setState({newHeight: newSize});
    }

    keyboardWillHide (e) {
        this.setState({newHeight: 0});
    }

    popRoute() {
        this.props.popRoute();
    }

    pushNewRoute(route , phoneWithCountryCode) {
      // Create Realm
      let realm = new Realm({schema: [realm_schema.People]});

      // check realm library
      // let people = realm.objects('People').filtered('s_phone_id = "'+$this.state.phone+'"');
       //let person = people.filtered('s_phone_id = '+$this.state.phone);

      // if(people.length == 0)
      // {
        //Create Realm objects and write to local storage
        realm.write(() => {
          let person = realm.create('People', {
            s_phone: phoneWithCountryCode,
            s_verificationCode:'',
            s_email:''
          });
        });
      // }
      // else {
      //
      //   let person = people[0]
      //
      //   console.warn(person);
      //   // console.warn(person.s_phone_id)
      //   // person.s_verificationCode = '100';
      //   realm.write(() => {
      //     person.s_verificationCode = '100';
      //     // realm.create('People', {s_phone_id: $this.state.phone,
      //     //             s_verificationCode:'55667788',
      //     //             s_password:'',
      //     //             s_email:''});
      //   });
      // }
      this.props.pushNewRoute(route);
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
      //console.warn('onNextPressed')
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

      User.sendVerificationCode(phoneWithCountryCode, global_variables.HOST+'/api/v1/signup/send_verification_code_sms',

       function successCallback(results) {
          $this.pushNewRoute('signUpVerify',phoneWithCountryCode);
       },

       function errorCallback(results) {
           alert(results.msg);
       });
       //this.props.pushNewRoute('signUpVerify');
      }

    render() {
        return (
            <Container theme={theme} style={{backgroundColor:'#ffffff'}}>
              <Content
                theme={signup}
                style={{backgroundColor: '#f5f6f7',marginTop: -(this.state.newHeight/3)}}
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
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route)),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route))
    }
}

export default connect(null, bindAction)(SignUp);
