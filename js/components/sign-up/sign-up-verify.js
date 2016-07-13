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
import styles from './styles';

const {User} = require('NativeModules');
const Realm = require('realm');

const TestUserSchema = {
    name: 'TestUser',
    primaryKey: 'i_user_id',
    properties: {
        i_user_id: 'int',
        s_name: 'string',
        s_username: 'string',
        s_password: 'string',
        s_email: 'string',
        s_phone: 'string',
        s_invitationCode: 'string',
        s_verificationCode: 'string',
        b_isDelete: 'bool',
    },
};



class SignUpVerify extends Component {

    popRoute() {
        this.props.popRoute();
    }

    navigateTo(route) {
        this.props.replaceOrPushRoute(route);
    }

    render() {
      console.log(Realm.defaultPath);

      const realm = new Realm({schema: [TestUserSchema]});

      // realm.write(() => {
      //   realm.create('TestUser', {i_user_id: 200, s_name: 'ben', s_username: 'ben@tmotx.com', s_password: '123456',
      // s_email: 'ben@tmotx.com', s_phone: '0900-000-000', s_invitationCode: 'abc123', s_verificationCode: '123456', b_isDelete: false});
      // });

      // Query
      let testUser = realm.objects('TestUser').filtered('s_verificationCode = "abc123"');
      let count = testUser.length // => 0

      //alert(count);

      User.getUserVerificationCode(

             '0900000000',
             'www.ahhhahahah',

             function successCallback(results) {
                 //alert(results.verificationCode);
             },

             function errorCallback(results) {
                 //alert('Error: ' + results);
             }
      );


      // User.checkUserVerificationCode(
      //
      //   '0900000000',
      //   'abc123',
      //   'www.ahahahahahah',
      //
      //   function successCallback(results) {
      //       alert(results.valid);
      //   },
      //
      //   function errorCallback(results) {
      //       alert('Error: ' + results);
      //   }
      // );

 //        var userInfo = {
 //          "email": "hahahaha@tmotx.com",
 //          "name": "hahahaha",
 //          "phone" : "0900000000",
 //          "username" : "abc123",
 //          "password" : "123456"
 //        };
 //
 //        User.createUser(
 //
 //          userInfo,
 //          'asdfasdfasdfasdf',
 //
 //          function successCallback(results) {
 //              alert(results.success);
 //          },
 //
 //          function errorCallback(results) {
 //              alert('Error: ' + results);
 //          }
 // );



        return (
            <Container theme={theme} style={{backgroundColor:'#ffffff'}}>
              <Image source={require('../../../images/glow2.png')} style={styles.container} >
                <Header>
                    <Button transparent onPress={() => this.popRoute()}>
                        <Icon name="ios-arrow-back" />
                    </Button>
                    <Title>SignUp</Title>
                      <Button transparent onPress={() => this.navigateTo('signUpCreate')}>
                          Next
                      </Button>
                </Header>

                <Content padder style={{backgroundColor: 'transparent'}}>
                    <View padder>
                      <Text>請輸入認證碼</Text>
                        <View style={styles.mb20}>
                            <Input placeholder="ex:verifymeverifyme" />
                        </View>
                        <Text>認證碼已寄到輸入電話號碼。</Text>
                        <Text>若未收到認證碼請點選 "重寄認證碼"。</Text>
                    </View>
                </Content>
              </Image>
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
