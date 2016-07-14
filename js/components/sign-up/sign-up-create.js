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

class SignUpCreate extends Component {

  constructor(props) {
      super(props);
      this.onNextPressed = this.onNextPressed.bind(this);
      this.state = {
          password: '',
          retype_password: ''
      };
  }

    popRoute() {
        this.props.popRoute();
    }

    navigateTo(route) {
        this.props.replaceOrPushRoute(route);
    }

    // next button tapped
    onNextPressed(){

      if(this.state.password != this.state.retype_password)
      {
        alert("密碼不一致");
        return;
      }
      //this.setState({client_error_msg: '成功'});
      this.navigateTo('edit');
    }

    render() {
      console.log(Realm.defaultPath);

        return (
            <Container theme={theme} style={{backgroundColor:'#ffffff'}}>
              <Image source={require('../../../images/glow2.png')} style={styles.container} >
                <Header>
                    <Button transparent onPress={() => this.popRoute()}>
                        <Icon name="ios-arrow-back" />
                    </Button>
                    <Title>註冊</Title>
                      <Button transparent onPress={this.onNextPressed}>
                          Next
                      </Button>
                </Header>

                <Content padder style={{backgroundColor: 'transparent'}}>
                    <View padder>
                      <Text>建立密碼</Text>
                        <View style={styles.mb20}>
                            <Input placeholder="ex:password" onChangeText={(password) => this.setState({password})} value={this.state.password}/>
                        </View>
                        <View style={styles.mb20}>
                            <Input placeholder="re-type password" onChangeText={(retype_password) => this.setState({retype_password})} value={this.state.retype_password}/>
                        </View>
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

export default connect(null, bindAction)(SignUpCreate);
