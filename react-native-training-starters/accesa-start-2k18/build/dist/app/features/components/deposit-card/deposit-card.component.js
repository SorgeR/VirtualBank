import * as tslib_1 from "tslib";
import React, { Component } from "react";
import { Card } from "native-base";
import { View, Button, Text } from "react-native";
import styles from "./deposit-card.component.style";
var DepositCard = /** @class */ (function (_super) {
    tslib_1.__extends(DepositCard, _super);
    function DepositCard() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DepositCard.prototype.render = function () {
        var _this = this;
        return (<Card style={styles.card}>
                <View style={styles.wrapper}>
                    <View style={styles.horizontalWrapper}>
                        <View style={styles.leftTextWrapper}>
                            <Text style={styles.titleText}>Title: {this.props.title}</Text>
                            <Text style={styles.sumToGetText}>Sum To Get: {this.props.sumToGet}</Text>
                        </View>
                        <View style={styles.dateWrapper}>
                            <Text style={styles.dateText}>{this.props.date}</Text>
                        </View>
                    </View>

                    <Button title={"Destroy deposit!"} onPress={function () {
            _this.props.enableDialog();
        }}/>

                </View>
            </Card>);
    };
    return DepositCard;
}(Component));
export default DepositCard;
//# sourceMappingURL=deposit-card.component.js.map