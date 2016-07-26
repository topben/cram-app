/**
 * Created by kylefang on 4/28/16.
 * @flow
 */

'use strict';
//Currently using it as playground

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {replaceOrPushRoute} from '../../actions/route';
// import CodePush from 'react-native-code-push';
import { Image } from 'react-native';
import {popRoute} from '../../actions/route';
import { Col, Row, Grid } from "react-native-easy-grid";
import {Container, Header, Title, Content, Card, CardItem, List, ListItem, Thumbnail, Text, Button, Icon, InputGroup, Input, View } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';
import invitation from './invitation-theme';

class Invitation extends Component {
  constructor(props) {
      super(props);
      this.onNextPressed = this.onNextPressed.bind(this);
      this.state = {
          username: '',
          email: ''
      };
  }

    popRoute() {
        this.props.popRoute();
    }

    navigateTo(route) {
        this.props.replaceOrPushRoute(route);
    }

    onNextPressed(){
      console.log(this.state.username);
      this.navigateTo('login');
    }

    render() {
        return (
          <View style={{flex:1,backgroundColor:'#f5f6f7'}}>
            <Header style={{backgroundColor:'#f5f6f7'}}>
              <Button transparent onPress={() => this.popRoute()}>
                <Image source={require('../../../images/button/btn_back.png')}/>
              </Button>
              <Text style={styles.topTitle}>邀請碼</Text>
            </Header>
            <Content
              theme={invitation}
              style={{backgroundColor: '#e7e7e8'}}
              scrollEnabled={this.state.scroll}>
              <View>
                <Card style={{margin:20}}>
                  <CardItem style={{backgroundColor:'#fff'}}>
                    <Text>
                      Your text here
                    </Text>
                  </CardItem>
                  <CardItem style={{backgroundColor:'#fff'}}>
                    <Text>
                      Your text here
                    </Text>
                  </CardItem>
                  <CardItem style={{backgroundColor:'#fff'}}>
                    <Text>
                      Your text here
                    </Text>
                  </CardItem>
                </Card>
              </View>
            </Content>
          </View>
        )
    }
}

function bindAction(dispatch) {
    return {
        popRoute: () => dispatch(popRoute()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route))
    }
}

export default connect(null, bindAction)(Invitation);
