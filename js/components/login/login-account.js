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
import {closeDrawer} from '../../actions/drawer';
import {replaceOrPushRoute} from '../../actions/route';
import {Container, Header, Title, Content, Text, Button, Icon, InputGroup, Input, View } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';

const {User} = require('NativeModules');
const Realm = require('realm');

class LoginAccount extends Component {
  constructor(props) {
      super(props);
      this.onNextPressed = this.onNextPressed.bind(this);
      this.testRealmLogin = this.testRealmLogin.bind(this);
      this.state = {
          username: '',
          password: ''
      };
  }

    popRoute() {
        this.props.popRoute();
    }

    navigateTo(route) {
        this.props.replaceOrPushRoute(route);
    }

    testRealmLogin() {
      User.login(this.state.username, '',this.state.password,'',
             function successCallback(results) {
                 alert(results.message);
             },

             function errorCallback(results) {
                 //alert('Error: ' + results);
             });

      // realm.write(() => {
      //   realm.create('User', {i_user_id: 300, s_name: 'ben', s_username: 'ben@tmotx.com',
      //   s_password: '123456', s_email: 'ben@tmotx.com', s_phone: '0900-000-000', s_invitationCode: 'abc123',
      //   s_verificationCode: '123456', s_profileImage: '', b_isDelete: false});
      // });

    }

    // next button tapped
    onNextPressed(){
      //this.setState({client_error_msg: '成功'});
      this.navigateTo('login');
    }

    render() {
      console.log(Realm.defaultPath);

        return (
            <Container theme={theme} style={{backgroundColor:'#ffffff'}}>
                <Header>
                    <Button transparent onPress={() => this.popRoute()}>
                        <Icon name="ios-arrow-back" />
                    </Button>
                    <Title>登入</Title>
                      <Button transparent onPress={this.onNextPressed}>
                          Next
                      </Button>
                </Header>

                <Content padder style={{backgroundColor: 'transparent'}}>
                    <View padder>
                      <Text>輸入帳號</Text>
                        <View style={styles.mb20}>
                            <Input placeholder="ex:0912345678" onChangeText={(username) => this.setState({username})} value={this.state.username}/>
                        </View>
                        <Text>輸入密碼</Text>
                        <View style={styles.mb20}>
                            <Input placeholder="password" onChangeText={(password) => this.setState({password})} value={this.state.password}/>
                        </View>
                    </View>
                    <Button
                      style={styles.btn}
                      onPress={this.testRealmLogin}>
                      <Text style={styles.txt}>
                        測試Realm
                      </Text>
                    </Button>
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

export default connect(null, bindAction)(LoginAccount);
