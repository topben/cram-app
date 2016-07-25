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
import {pushNewRoute, replaceOrPushRoute} from '../../actions/route';
import {Container, Header, Title, Content, Text, Button, Icon, InputGroup, Input, View } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';
import login from './login-theme';

const {User} = require('NativeModules');
const Realm = require('realm');

class LoginPhone extends Component {
  constructor(props) {
      super(props);
      this.onNextPressed = this.onNextPressed.bind(this);
      this.state = {
          phone: '',
          password: ''
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

    // next button tapped
    onNextPressed(){
      //this.setState({client_error_msg: '成功'});
      this.props.pushNewRoute('scanner');
    }

    render() {
      console.log(Realm.defaultPath);

        return (
            <View style={{flex:1,backgroundColor:'#f5f6f7'}}>
                <Button transparent style={{marginTop:theme.headerBtnMarginTop}} onPress={() => this.popRoute()}>
                  <Image source={require('../../../images/button/btn_back.png')}/>
                </Button>
                <Content theme={login} padder style={{backgroundColor: 'transparent'}}>
                  <Image source={require('../../../images/tmot_logo/ic_tmot_logo.png')} style={{alignSelf:'center',marginTop:105}} />
                  <Text style={styles.phoneLoginTitle}>手機號碼登入</Text>
                    <View padder>
                        <View style={styles.mb20}>
                            <Input placeholder="+886" style={styles.generalChineseTxt} onChangeText={(phone) => this.setState({phone})} value={this.state.phone}/>
                        </View>
                        <View style={styles.mb20}>
                            <Input placeholder="密碼" style={styles.generalChineseTxt} onChangeText={(password) => this.setState({password})} value={this.state.password}/>
                        </View>
                        <Button rounded style={styles.phoneBtn} onPress={this.onNextPressed}>
                            <Text style={styles.phoneLoginTxt}>確定</Text>
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

export default connect(null, bindAction)(LoginPhone);
