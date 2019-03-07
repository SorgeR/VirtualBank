import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { Card } from "native-base";
import { Text, View, Button } from "react-native";
import styles from "./view-personal-debtors-card.component.style";
var ViewPersonalDebtorsCard = /** @class */ (function (_super) {
    tslib_1.__extends(ViewPersonalDebtorsCard, _super);
    function ViewPersonalDebtorsCard(props) {
        var _this = _super.call(this, props) || this;
        _this.renderTexts = function () {
            return (<View style={styles.middleWrapper}>

                <View style={styles.topWrapper}>
                    <Text style={styles.billNameText}>{_this.props.billName}</Text>
                    <Text style={styles.sumToPayText}>{_this.props.sumToPay} RON</Text>
                </View>

                <View style={styles.horizontalLine}/>

                <View style={styles.bottomWrapper}>
                    <Text style={styles.receiverNameText}>Debtor: {_this.props.debtorFirstName} {_this.props.debtorLastName}</Text>

                </View>
            </View>);
        };
        return _this;
    }
    ViewPersonalDebtorsCard.prototype.render = function () {
        var _this = this;
        return (<Card style={styles.card}>
                <View style={styles.wrapper}>

                    {this.renderTexts()}


                    <View style={styles.buttonWrapper}>

                        <Button onPress={function () {
            _this.props.messageDebtorFunction();
        }} title={"Message your friend"}/>
                    </View>


                </View>
            </Card>);
    };
    return ViewPersonalDebtorsCard;
}(Component));
export default ViewPersonalDebtorsCard;
//# sourceMappingURL=view-personal-debtors-card.component.js.map