import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { Card } from "native-base";
import { Text, View, Button } from "react-native";
import styles from "./pay-debt-card.component.style";
var PayDebtCard = /** @class */ (function (_super) {
    tslib_1.__extends(PayDebtCard, _super);
    function PayDebtCard(props) {
        var _this = _super.call(this, props) || this;
        _this.renderTexts = function () {
            return (<View style={styles.middleWrapper}>

                <View style={styles.topWrapper}>
                    <Text style={styles.billNameText}>{_this.props.billName}</Text>
                    <Text style={styles.sumToPayText}>{_this.props.sumToPay} RON</Text>
                </View>


                <View style={styles.horizontalLine}/>

                <View style={styles.bottomWrapper}>
                    <Text style={styles.receiverNameText}>Receiver: {_this.props.creatorFirstName} {_this.props.creatorLastName}</Text>
                    <Text style={styles.creatorIBAN}>Account: {_this.props.creatorIBAN}</Text>
                </View>
            </View>);
        };
        return _this;
    }
    PayDebtCard.prototype.render = function () {
        var _this = this;
        return (<Card style={styles.card}>
                <View style={styles.wrapper}>

                    {this.renderTexts()}


                    <View style={styles.buttonsHorizontalWrapper}>
                        <View style={styles.buttonWrapper}>

                            <Button onPress={function () {
            _this.props.payDebtFunction();
        }} title={"Pay the debt"}/>
                        </View>

                        <View style={styles.buttonWrapper}>
                            <Button onPress={function () {
            _this.props.payLaterFunction();
        }} title={"I will pay later"}/>
                        </View>

                    </View>

                </View>
            </Card>);
    };
    return PayDebtCard;
}(Component));
export default PayDebtCard;
//# sourceMappingURL=pay-debt-card.component.js.map