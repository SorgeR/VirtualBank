import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { Tab, Tabs } from 'native-base';
import { View } from 'react-native';
import MyDebtsComponent from './my-debts.component';
import FriendDebtsComponent from "./friend-debts.component";
import styles from "./debts.component.style";
var DebtsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DebtsComponent, _super);
    function DebtsComponent(props) {
        return _super.call(this, props) || this;
    }
    DebtsComponent.prototype.render = function () {
        return (<View style={styles.wrapper}>

                <Tabs tabBarUnderlineStyle={styles.tabBarUnderlineStyle}>
                    <Tab heading="My Debts" tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} textStyle={styles.tabTextStyle}>
                        <MyDebtsComponent navigation={this.props.navigation}/>
                    </Tab>
                    <Tab heading="My Debtors" tabStyle={styles.tabStyle} activeTabStyle={styles.activeTabStyle} textStyle={styles.tabTextStyle}>
                        <FriendDebtsComponent navigation={this.props.navigation}/>
                    </Tab>

                </Tabs>
            </View>);
    };
    return DebtsComponent;
}(Component));
export default DebtsComponent;
//# sourceMappingURL=debts.component.js.map