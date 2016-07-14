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
import {Container, Header, Title, Content, Card, Thumbnail, Text, Button, Icon, InputGroup, Input, View } from 'native-base';
import theme from '../../themes/base-theme';
import styles from './styles';

class Edit extends Component {

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
      console.log('hello');
        return (
          <Container
            theme={theme}
            style={{backgroundColor:'#ffffff'}}>
            <Header>
              <Button
                transparent
                onPress={() => this.popRoute()}>
                <Icon name="ios-arrow-back" />
              </Button>
              <Title>編輯帳戶</Title>
              <Button
                transparent
                onPress={() => this.onNextPressed()}>
                Next
              </Button>
            </Header>
            <Content
              padder
              style={{backgroundColor: 'transparent'}}>
              <View padder>
                <Card
                  transparent
                  foregroundColor="#000"
                  style={styles.card}>
                    <Thumbnail
                      circular
                      size={100}
                      source={require('../../../images/contacts/sanket.png')} />
                    <Text>Kumar Sanket</Text>
                    <Text note>StrapMobile</Text>
                </Card>
                <View style={styles.mb20}>
                  <Icon name="ios-person" />
                  <Input
                    placeholder="Create an username"
                    onChangeText={(username) => this.setState({username})}
                    string={this.state.username}/>
                </View>
                <View style={styles.mb20}>
                  <Icon name="ios-person" />
                  <Input
                    placeholder="Enter email"
                    secureTextEntry={true}
                    onChangeText={(email) => this.setState({email})}
                    value={this.state.password}
                    />
                </View>
              </View>
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

export default connect(null, bindAction)(Edit);
