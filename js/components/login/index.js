/**
 * Created by kylefang on 4/28/16.
 * @flow
 */

'use strict';
//Currently using it as playground

import React, {Component} from 'react';
import {connect} from 'react-redux';
// import CodePush from 'react-native-code-push';
import { DeviceEventEmitter, Dimensions, Image, Platform, Keyboard} from 'react-native';
import {pushNewRoute, replaceRoute} from '../../actions/route';

import {Container, Content, Text, InputGroup, Input, Button, Icon, View } from 'native-base';
import login from './login-theme';
import styles from './styles';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
        };
    }
    // componentWillMount () {
    //     Keyboard.addListener('keyboardWillShow', this.keyboardWillShow.bind(this))
    //     Keyboard.addListener('keyboardWillHide', this.keyboardWillHide.bind(this))
    // }

    // keyboardWillShow (e) {
    //     let newSize = Dimensions.get('window').height - e.endCoordinates.height
    //     this.setState({scroll: true})
    // }

    // keyboardWillHide (e) {
    //     this.setState({scroll: false})
    // }

    replaceRoute(route) {
        this.props.replaceRoute(route);
    }

    pushNewRoute(route) {
         this.props.pushNewRoute(route);
    }

    render() {
        return (
          <Container>
            <Content
              style={{backgroundColor: '#f5f6f7'}}
              theme={login}
              scrollEnabled={this.state.scroll}>
              <Image source={require('../../../images/tmot_logo/ic_tmot_logo.png')} style={{alignSelf:'center',marginTop:105}} />
              <Text style={styles.welcomeTxt}>WELCOME</Text>
              <View style={styles.bg}>
                <Button
                  rounded
                  style={styles.btn}
                  onPress={() => this.pushNewRoute('loginPhone')}>
                  <Text style={styles.phoneLoginTxt}>
                  手機號碼登入
                  </Text>
                </Button>
                <Button
                  transparent
                  style={{alignSelf:'center'}}
                  onPress={() => this.pushNewRoute('signUp')}>
                  <Text style={styles.registerTxt}>
                    創建新帳號
                  </Text>
                </Button>
              </View>
            </Content>
          </Container>
        )
    }
}


function bindActions(dispatch){
    return {
        replaceRoute:(route)=>dispatch(replaceRoute(route)),
        pushNewRoute:(route)=>dispatch(pushNewRoute(route))
    }
}

export default connect(null, bindActions)(Login);
