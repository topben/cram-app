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

const Realm = require('realm');
const {User} = require('NativeModules');

class SignUpVerify extends Component {

  constructor(props) {
      super(props);
      this.state = {
          code: ''
      };
  }

    popRoute() {
        this.props.popRoute();
    }

    navigateTo(route) {
      var $this = this;
      User.checkVerificationCode(this.state.code, 'http://192.168.11.48:3000/api/v1/signup/check_verification_code',
       function successCallback(results) {
           alert(results.success);
           $this.props.replaceOrPushRoute(route);
       },
       function errorCallback(results) {
           alert(results.msg);
       });


    }

    render() {
        return (
            <Container theme={theme} style={{backgroundColor:'#ffffff'}}>
              <Image source={require('../../../images/glow2.png')} style={styles.container} >
                <Header>
                    <Button transparent onPress={() => this.popRoute()}>
                        <Icon name="ios-arrow-back" />
                    </Button>
                    <Title>註冊</Title>
                      <Button transparent onPress={() => this.navigateTo('signUpCreate')}>
                          Next
                      </Button>
                </Header>

                <Content padder style={{backgroundColor: 'transparent'}}>
                    <View padder>
                      <Text>請輸入認證碼</Text>
                        <View style={styles.mb20}>
                            <Input placeholder="ex:verifymeverifyme" onChangeText={(code) => this.setState({code})} value={this.state.code}/>
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
