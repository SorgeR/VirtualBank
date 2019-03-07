import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import styles from "./AddAccountDialog.style";
var AddAccountDialog = /** @class */ (function (_super) {
    tslib_1.__extends(AddAccountDialog, _super);
    function AddAccountDialog(props) {
        return _super.call(this, props) || this;
    }
    AddAccountDialog.prototype.render = function () {
        var _this = this;
        return (<View style={{ flex: 1, flexGrow: 1 }}>
                <View style={styles.headerView}>
                    <Text style={styles.addMoneyHeaderText}>Add Money</Text>
                </View>

                <View style={styles.middleView}>
                    <View style={styles.insideMiddleViews}>
                        <Text style={styles.textIBAN}>{this.props.IBAN}</Text>
                        <Text style={styles.textIBAN}>{this.props.alias}</Text>
                    </View>


                    <View style={styles.textInputAndCurrencyView}>
                        <View style={styles.textInputView}>
                            <TextInput style={styles.textInputSum} placeholder={"0"} keyboardType={"numeric"}/>
                        </View>
                        <View style={styles.textCurrencyView}>
                            <Text style={styles.textCurrency}>{this.props.currency}</Text>
                        </View>

                    </View>


                </View>


                <View style={styles.footerView}>
                    <TouchableOpacity style={styles.touchableOpacityLeft} onPress={function () { _this.props.actionOnAddPress(); }}>
                        <Text style={styles.buttonTextStyle}>ADD</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.touchableOpacityRight} onPress={function () { _this.props.actionOnCancelPress(); }}>
                        <Text style={styles.buttonTextStyle}>CLOSE</Text>
                    </TouchableOpacity>
                </View>

            </View>);
    };
    return AddAccountDialog;
}(Component));
export default AddAccountDialog;
//# sourceMappingURL=AddAccountDialog.js.map