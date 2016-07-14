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
            visibleHeight: Dimensions.get('window').height,
            scroll: false
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
              style={{backgroundColor: '#ffffff'}}
              theme={login}
              scrollEnabled={this.state.scroll}>
              <View style={styles.bg}>
                <Button
                  style={styles.btn}
                  onPress={() => this.replaceRoute('loginPhone')}>
                  <Text style={styles.txt}>
                  手機號碼登入
                  </Text>
                </Button>
                <Button
                  style={styles.btn}
                  onPress={() => this.pushNewRoute('loginAccount')}>
                  <Text style={styles.txt}>
                    帳號登入
                  </Text>
                </Button>
                <Button
                  style={styles.btn}
                  onPress={() => this.pushNewRoute('signUp')}>
                  <Text style={styles.txt}>
                    註冊帳號
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
