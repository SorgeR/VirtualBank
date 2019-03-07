import React,{Component} from 'react'
import { Tab, Tabs } from 'native-base';
import {View} from 'react-native';
import MyDebtsComponent from './my-debts.component';
import FriendDebtsComponent from "./friend-debts.component";
import styles from "./debts.component.style";

export default class DebtsComponent extends Component<any,any> {

    constructor(props:any){
        super(props);
    }
    render(){
        return(
            <View style={styles.wrapper}>

                <Tabs
                    tabBarUnderlineStyle={styles.tabBarUnderlineStyle}
                >
                    <Tab heading="My Debts"
                         tabStyle={styles.tabStyle}
                         activeTabStyle={styles.activeTabStyle}
                         textStyle={styles.tabTextStyle}>
                        <MyDebtsComponent navigation={this.props.navigation} />
                    </Tab>
                    <Tab heading="My Debtors"
                         tabStyle={styles.tabStyle}
                         activeTabStyle={styles.activeTabStyle}
                         textStyle={styles.tabTextStyle}>
                        <FriendDebtsComponent navigation={this.props.navigation} />
                    </Tab>

                </Tabs>
            </View>


        )
    }
}