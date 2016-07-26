import React, {Component} from 'react';
import {View, Text, Button,Icon, List, ListItem, Badge, Content, Thumbnail,Card} from 'native-base';
import {connect} from 'react-redux';
import {closeDrawer} from '../../actions/drawer';
import {replaceOrPushRoute} from '../../actions/route';
import styles from "./styles";
import {Image} from 'react-native';

class SideBar extends Component {
    navigateTo(route) {
        this.props.closeDrawer();
        this.props.replaceOrPushRoute(route);
    }

    render(){
        return (
          <Content style={{backgroundColor: '#f5f6f7'}} >
              <Thumbnail size={200} style={{alignSelf: 'center', marginTop: 20, marginBottom: 15, resizeMode: 'contain'}} circular source={require('../../../images/tmot_logo/ic_tmot_logo.png')} />
              <List  foregroundColor={"white"} >
                <ListItem button onPress={() => this.navigateTo('account')} iconLeft  style={styles.links} >
                    <Icon name="ios-person-outline" style={{color: '#ff6100'}}/>
                    <Text style={styles.sideBarChineseTxt}>帳號</Text>
                </ListItem>
                <ListItem button onPress={() => this.navigateTo('invitation')} iconLeft style={styles.links} >
                    <Icon name="ios-mail-open-outline" style={{color: '#ff6100'}}/>
                    <Text style={styles.sideBarChineseTxt}>邀請碼</Text>
                </ListItem>
              </List>
          </Content>
        );
    }
}

function bindAction(dispatch) {
    return {
        closeDrawer: ()=>dispatch(closeDrawer()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route))
    }
}

export default connect(null, bindAction)(SideBar);
