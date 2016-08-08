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
              <List  foregroundColor={"white"} style={{paddingTop:80}}>
                <ListItem button onPress={() => this.navigateTo('account')} iconLeft  style={styles.links} >
                    <Icon name="ios-person-outline" style={{color: '#ff6100'}}/>
                    <Text style={styles.sideBarChineseTxt}>帳號</Text>
                </ListItem>
                <ListItem button onPress={() => this.navigateTo('calendar')} iconLeft  style={styles.links} >
                    <Icon name="ios-calendar-outline" style={{color: '#ff6100'}}/>
                    <Text style={styles.sideBarChineseTxt}>行事曆</Text>
                </ListItem>
              </List>
          </Content>
        );
    }
}

// <ListItem button onPress={() => this.navigateTo('invitation')} iconLeft style={styles.links} >
//     <Icon name="ios-mail-open-outline" style={{color: '#ff6100'}}/>
//     <Text style={styles.sideBarChineseTxt}>邀請碼</Text>
// </ListItem>

function bindAction(dispatch) {
    return {
        closeDrawer: ()=>dispatch(closeDrawer()),
        replaceOrPushRoute:(route)=>dispatch(replaceOrPushRoute(route))
    }
}

export default connect(null, bindAction)(SideBar);
