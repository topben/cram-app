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



class SignUp extends Component {

    popRoute() {
        this.props.popRoute();
    }

    render() {

      // const realm = new Realm({schema: [TestUserSchema]});
      //
      // // realm.write(() => {
      // //   realm.create('TestUser', {i_user_id: 1, s_name: 'ben', s_username: 'ben@tmotx.com', s_password: '123456',
      // // s_email: 'ben@tmotx.com', s_phone: '0900-000-000', s_invitationCode: 'abc123', s_verificationCode: '123456', b_isDelete: false});
      // // });
      //
      // // Query
      // let testUser = realm.objects('TestUser');
      // let count = testUser.length // => 0
      //
      // console.log(count);

      User.getUserVerificationCode(

             '0900-000-000',
             'www.ahhhahahah',

             function successCallback(results) {
                 alert(results.verificationCode);
             },

             function errorCallback(results) {
                 alert('Error: ' + results);
             }
      );

      User.checkUserVerificationCode(

        '0900-000-000',
        'abc123',
        'www.ahahahahahah',

        function successCallback(results) {
            alert(results.valid);
        },

        function errorCallback(results) {
            alert('Error: ' + results);
        }
      );

 //        var userInfo = {
 //          "email": "hahahaha@tmotx.com",
 //          "name": "hahahaha",
 //          "phone" : "0900-000-000",
 //          "username" : "abc123",
 //          "password" : "123456"
 //        };
 //
 //
 //        User.createUser(
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

            <Container theme={theme} style={{backgroundColor:'#384850'}}>
              <Image source={require('../../../images/glow2.png')} style={styles.container} >
                <Header>
                    <Button transparent onPress={() => this.popRoute()}>
                        <Icon name="ios-arrow-back" />
                    </Button>
                    <Title>SignUp</Title>
                </Header>

                <Content padder style={{backgroundColor: 'transparent'}}>
                    <View padder>
                        <InputGroup style={styles.mb20}>
                            <Icon name="ios-person" />
                            <Input placeholder="Name" />
                        </InputGroup>
                        <InputGroup style={styles.mb20}>
                            <Icon name="ios-mail-open-outline" />
                            <Input placeholder="Email" />
                        </InputGroup>
                        <InputGroup style={styles.mb20}>
                            <Icon name="ios-unlock-outline" />
                            <Input
                                placeholder="Password"
                                secureTextEntry={true}
                            />
                        </InputGroup>
                        <InputGroup style={styles.mb20}>
                            <Icon name="ios-calendar-outline" />
                            <Input placeholder="Birthday"/>
                        </InputGroup>
                        <InputGroup style={styles.mb20}>
                            <Icon name="ios-transgender" />
                            <Input placeholder="Gender"/>
                        </InputGroup>
                        <Button rounded block style={{backgroundColor: '#fff', marginTop: 20}} textStyle={{color: '#00c497'}}>
                            Save and Continue
                        </Button>
                    </View>
                </Content>
              </Image>
            </Container>
        )
    }
}

function bindAction(dispatch) {
    return {
        popRoute: () => dispatch(popRoute())
    }
}

export default connect(null, bindAction)(SignUp);
