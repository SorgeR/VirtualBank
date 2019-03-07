import React, {Component} from 'react'
import {Tab, Tabs} from 'native-base';
import {View} from 'react-native';
import TopUpHistory from './top-up-history.component';
import TransferHistory from './transfer-history.component';

export default class OperationHistoryComponent extends Component<any, any> {

    constructor(props: any) {
        super(props);
    }

    render() {
        return (
            <View style={{flex: 1}}>

                <Tabs
                    tabBarUnderlineStyle={{backgroundColor: "#1B87E6"}}
                >
                    <Tab heading="Transfers" tabStyle={{backgroundColor: 'white'}}
                         activeTabStyle={{backgroundColor: "#3698f0",}}
                         textStyle={{color: "#3698f0"}}>
                        <TransferHistory navigation={this.props.navigation}/>
                    </Tab>
                    <Tab heading="Top Ups" tabStyle={{backgroundColor: 'white'}}
                         activeTabStyle={{backgroundColor: "#3698f0",}}
                         textStyle={{color: "#3698f0"}}>
                        <TopUpHistory navigation={this.props.navigation}/>
                    </Tab>


                </Tabs>
            </View>


        )
    }
}