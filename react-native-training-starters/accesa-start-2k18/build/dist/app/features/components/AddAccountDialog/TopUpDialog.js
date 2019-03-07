import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styles from "./TopUpDialog.style";
var TopUpDialog = /** @class */ (function (_super) {
    tslib_1.__extends(TopUpDialog, _super);
    function TopUpDialog(props) {
        return _super.call(this, props) || this;
    }
    TopUpDialog.prototype.render = function () {
        var _this = this;
        return (<View style={{ flex: 1, flexGrow: 1 }}>
                <View style={styles.headerView}>
                    <Text style={styles.addMoneyHeaderText}>Add Money</Text>
                </View>

                <View style={styles.middleView}>
                    <View style={styles.insideMiddleViews}>
                        <Text style={styles.textIBAN}>{this.props.IBAN}</Text>
                        <Text style={styles.textIBAN}>{this.props.alias}</Text>
                        <Text style={styles.textBudget}>Budget  {this.props.budget}</Text>
                    </View>


                    <View style={styles.textInputAndCurrencyView}>
                        <View style={styles.textInputView}>
                            <TextInput style={styles.textInputSum} placeholder={"0"} keyboardType={"numeric"} onChangeText={function (text) {
            _this.setState({
                sumToTransfer: Number(text)
            });
        }}/>
                        </View>
                        <View style={styles.textCurrencyView}>
                            <Text style={styles.textCurrency}>{this.props.currency}</Text>
                        </View>

                    </View>


                </View>


                <View style={styles.footerView}>
                    <TouchableOpacity style={styles.touchableOpacityLeft} onPress={function () { _this.props.actionOnAddPress(_this.props.idAccount, _this.state.sumToTransfer); }}>
                        <Text style={styles.buttonTextStyle}>ADD</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.touchableOpacityRight} onPress={function () { _this.props.actionOnCancelPress(); }}>
                        <Text style={styles.buttonTextStyle}>CLOSE</Text>
                    </TouchableOpacity>
                </View>

            </View>);
    };
    return TopUpDialog;
}(Component));
export default TopUpDialog;
//# sourceMappingURL=TopUpDialog.js.map