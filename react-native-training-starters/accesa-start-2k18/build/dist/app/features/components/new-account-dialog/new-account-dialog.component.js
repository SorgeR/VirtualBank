import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Picker } from "react-native";
import styles from "./new-account-dialog.component.style";
var NewAccountDialog = /** @class */ (function (_super) {
    tslib_1.__extends(NewAccountDialog, _super);
    function NewAccountDialog(props) {
        var _this = _super.call(this, props) || this;
        _this.handleOnValueChangePicker = function (itemValue) {
            if (itemValue != 0) {
                _this.setState({
                    chosenCurrency: itemValue
                });
            }
        };
        _this.state = {
            chosenCurrency: "0",
            alias: ""
        };
        return _this;
    }
    NewAccountDialog.prototype.render = function () {
        var _this = this;
        return (<View style={styles.wrapper}>
                <View style={styles.headerView}>
                    <Text style={styles.addAccountHeaderText}>Add Account</Text>
                </View>

                <View style={styles.middleView}>
                    <View style={styles.accountAliasWrapper}>
                        <Text style={styles.textCurrency}>Account alias</Text>
                        <TextInput placeholder={"Enter an alias"} style={styles.aliasTextInput} onChangeText={function (text) {
            _this.setState({
                alias: text
            });
        }}/>

                    </View>
                    <View style={styles.accountAliasWrapper}>
                        <Text style={styles.textCurrency}>Account currency</Text>
                        <Picker mode={'dropdown'} style={styles.pickerStyle} selectedValue={this.state.chosenCurrency} onValueChange={function (itemValue) {
            _this.handleOnValueChangePicker(itemValue);
        }}>
                            <Picker.Item label="Select account's currency..." value='0'/>
                            <Picker.Item label="RON" value='RON'/>

                        </Picker>

                    </View>


                </View>


                <View style={styles.footerView}>
                    <TouchableOpacity style={styles.touchableOpacityLeft} onPress={function () {
            _this.props.actionOnAddPress(_this.props.idOwner, _this.state.chosenCurrency, _this.state.alias);
        }}>
                        <Text style={styles.buttonTextStyle}>ADD</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.touchableOpacityRight} onPress={function () {
            _this.props.actionOnCancelPress();
        }}>
                        <Text style={styles.buttonTextStyle}>CLOSE</Text>
                    </TouchableOpacity>
                </View>

            </View>);
    };
    return NewAccountDialog;
}(Component));
export default NewAccountDialog;
//# sourceMappingURL=new-account-dialog.component.js.map