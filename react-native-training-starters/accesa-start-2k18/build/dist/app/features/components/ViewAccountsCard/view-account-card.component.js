import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Card, } from "native-base";
import styles from "./view-account-card.component.style";
var ViewAccountsCard = /** @class */ (function (_super) {
    tslib_1.__extends(ViewAccountsCard, _super);
    function ViewAccountsCard(props) {
        var _this = _super.call(this, props) || this;
        _this.renderRightButton = function () {
            if (_this.props.ImagePath != undefined) {
                return (<TouchableOpacity style={[styles.goToTopupMoneyTouchableOpacity, { backgroundColor: _this.props.RightButtonColor }]} onPress={function () {
                    _this.props.OnPressRightButton(_this.props.RightButtonParameter);
                }}>

                <Image source={_this.props.ImagePath} style={[styles.iconImageStyle, {
                        height: _this.props.RightButtonImageHeight,
                        width: _this.props.RightButtonImageWidth
                    }]} resizeMode={'contain'}/>

            </TouchableOpacity>);
            }
            return null;
        };
        return _this;
    }
    ViewAccountsCard.prototype.render = function () {
        var _a = this.props, IBAN = _a.IBAN, Budget = _a.Budget, Alias = _a.Alias, Currency = _a.Currency;
        return (<Card style={styles.card}>
                <View style={styles.wrapper}>
                    <View style={styles.horizontalWrapper}>
                        <View style={styles.leftWrapper}>
                            <Text style={styles.textIBAN}>{IBAN}</Text>
                            <Text style={styles.textAlias}>{Alias}</Text>
                            <Text style={styles.textBudget}>{Budget} {Currency}</Text>
                        </View>
                        <View style={styles.rightWrapper}>
                            {this.renderRightButton()}
                        </View>
                    </View>
                </View>
            </Card>);
    };
    return ViewAccountsCard;
}(Component));
export default ViewAccountsCard;
//# sourceMappingURL=view-account-card.component.js.map