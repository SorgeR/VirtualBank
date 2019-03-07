import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { Tab, Tabs } from 'native-base';
import { View } from 'react-native';
import TopUpHistory from './top-up-history.component';
import TransferHistory from './transfer-history.component';
var OperationHistoryComponent = /** @class */ (function (_super) {
    tslib_1.__extends(OperationHistoryComponent, _super);
    function OperationHistoryComponent(props) {
        return _super.call(this, props) || this;
    }
    OperationHistoryComponent.prototype.render = function () {
        return (<View style={{ flex: 1 }}>

                <Tabs tabBarUnderlineStyle={{ backgroundColor: "#1B87E6" }}>
                    <Tab heading="Transfers" tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: "#3698f0", }} textStyle={{ color: "#3698f0" }}>
                        <TransferHistory navigation={this.props.navigation}/>
                    </Tab>
                    <Tab heading="Top Ups" tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: "#3698f0", }} textStyle={{ color: "#3698f0" }}>
                        <TopUpHistory navigation={this.props.navigation}/>
                    </Tab>


                </Tabs>
            </View>);
    };
    return OperationHistoryComponent;
}(Component));
export default OperationHistoryComponent;
//# sourceMappingURL=operation-history.component.js.map