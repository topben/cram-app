/**
 * Created by kylefang on 4/28/16.
 * @flow
 */

'use strict';
//Currently using it as playground

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {pushNewRoute,popRoute} from '../../actions/route';
import {replaceOrPushRoute} from '../../actions/route';
// import CodePush from 'react-native-code-push';
import { DeviceEventEmitter, Dimensions, Image, Keyboard, Alert} from 'react-native';
import {Container, Header, Title, Content, Card, Thumbnail, Text, Button, Icon, InputGroup, Input, View } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';
import edit from './edit-theme';
import global_variables from '../../global_variables';
import realm_schema from '../../realm_schema';

const {User} = require('NativeModules');
const Realm = require('realm');

class Edit extends Component {

  constructor(props) {
      super(props);
      this.onNextPressed = this.onNextPressed.bind(this);
      this.state = {
          email: '',
          isBtnDisabled: false
      };
  }

    popRoute() {
        this.props.popRoute();
    }

    pushNewRoute(route) {
         this.props.pushNewRoute(route);
    }

    navigateTo(route) {
        this.props.replaceOrPushRoute(route);
    }

    onNextPressed(){
      var $this = this;
      console.log(this.state.email);

      let realm = new Realm({schema: realm_schema});
      let people = realm.objects('People');
      let person = people[people.length - 1];

      // check empty email
      if(this.state.email == '')
      {
        Alert.alert(
          '',
          '請輸入電子信箱',
          [
            {text: 'OK', onPress: () => {}}
          ]
        )
        return;
      }

      // disable button to prevent rapidly tapping
      this.setState({isBtnDisabled: true});

      User.checkUsername(this.state.email, global_variables.HOST+'/api/v1/signup/check_username',
       function successCallback(results) {

         // enable / release button lock
         $this.setState({isBtnDisabled: false});
         // navigate to sign-up-create
          $this.pushNewRoute('signUpCreate');
          realm.write(() => {
            person.s_email = $this.state.email;
          });
       },
       function errorCallback(results) {
         // enable and release button lock
         $this.setState({isBtnDisabled: false});
          //alert(results.msg);
          Alert.alert(
            '',
            '輸入電話錯誤，請重新輸入',
            [
              {text: 'OK', onPress: () => {}}
            ]
          )
       });
        //this.props.replaceOrPushRoute('scanner');
    }

    render() {
        return (
          <Container style={{flex:1,backgroundColor:'#f5f6f7'}}>
            <Content
              theme={edit}
              style={{backgroundColor: '#f5f6f7'}}
              >
              <Button transparent style={{marginTop:theme.headerBtnMarginTop}} onPress={() => this.popRoute()}>
                <Image source={require('../../../images/button/btn_back.png')}/>
              </Button>
              <Image source={require('../../../images/profile/ic_profile_photo_md.png')} style={{alignSelf:'center',marginTop:105}} />
              <Text style={styles.mainTitle}>設定新帳號</Text>
                <View style={styles.mb20}>
                    <Input
                      placeholder="電子信箱"     
                      autoFocus = {true}
                      keyboardType='email-address'
                      onChangeText={(email) => this.setState({email})} value={this.state.email} />
                    <Text>{this.state.client_error_msg}</Text>
                  </View>
                  <Button disabled={this.state.isBtnDisabled} rounded style={styles.finishBtn} onPress={this.onNextPressed}>
                    <View>
                    <Text style={styles.emailTxt}>下一步</Text>
                    </View>
                  </Button>
            </Content>
          </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        popRoute:() => dispatch(popRoute()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route)),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route))
    }
}

export default connect(null, bindAction)(Edit);
