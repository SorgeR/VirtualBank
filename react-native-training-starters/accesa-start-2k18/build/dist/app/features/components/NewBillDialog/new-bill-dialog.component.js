import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { Picker, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./new-bill-dialog.component.style";
import ServiceUser from "../../../services/ServiceUser";
var NewBillDialog = /** @class */ (function (_super) {
    tslib_1.__extends(NewBillDialog, _super);
    function NewBillDialog(props) {
        var _this = _super.call(this, props) || this;
        _this.findIBANOfAccountWithID = function (id) {
            var found = _this.state.accounts.find(function (el) { return el.id == id; });
            _this.setState({
                budgetOnChosenAccount: found.budget,
                accountOnWhichYouPayIBAN: found.iban,
            });
        };
        _this.saveBill = function () {
            var idOwner = _this.props.idOwner;
            var _a = _this.state, description = _a.description, billName = _a.billName, accountOnWhichYouPay = _a.accountOnWhichYouPay, sumToPay = _a.sumToPay;
            if (_this.state.accountOnWhichYouPay == 0) {
                alert("Please choose an account!");
            }
            else if (_this.state.budgetOnChosenAccount < sumToPay) {
                alert("You dont have enough money on this account!");
            }
            else {
                _this.props.saveBillFunction(idOwner, description, billName, accountOnWhichYouPay, sumToPay);
                _this.props.onClosePress();
            }
        };
        _this.handleOnValueChangePicker = function (itemValue) {
            if (itemValue != 0) {
                _this.setState({
                    accountOnWhichYouPay: itemValue,
                }, function () {
                    _this.findIBANOfAccountWithID(_this.state.accountOnWhichYouPay);
                });
            }
        };
        _this.loadOwnerAccounts = function () {
            ServiceUser.getAccounts(_this.props.idOwner)
                .then(function (response) {
                _this.setState({
                    accounts: response.data,
                }, function () {
                    _this.setState({
                        isLoading: false
                    });
                });
            });
        };
        _this.renderOneAccountPickerItem = function (account, key) {
            return <Picker.Item key={key} label={account.iban} value={account.id}/>;
        };
        _this.state = {
            billName: "",
            accountOnWhichYouPay: 0,
            accountOnWhichYouPayIBAN: "",
            description: "",
            sumToPay: 0,
            accounts: [],
            isLoading: true,
            priceToPay: 0,
            budgetOnChosenAccount: 0,
        };
        _this.loadOwnerAccounts();
        return _this;
    }
    NewBillDialog.prototype.render = function () {
        var _this = this;
        if (!this.state.isLoading) {
            return (<View style={styles.wrapper}>
                    <View style={styles.headerView}>
                        <Text style={styles.titleText}>Create a new Bill</Text>
                    </View>

                    <View style={styles.middleView}>

                        <TextInput style={styles.sumToPayTextInput} underlineColorAndroid={'white'} placeholder={"Sum to pay"} onChangeText={function (text) {
                _this.setState({
                    sumToPay: Number(text)
                });
            }}/>


                        <TextInput style={styles.billNameTextInput} underlineColorAndroid={'white'} onChangeText={function (text) {
                _this.setState({
                    billName: text,
                });
            }} placeholder={"Bill name"}/>


                        <TextInput style={styles.descriptionTextInput} multiline={true} underlineColorAndroid={'white'} onChangeText={function (text) {
                _this.setState({
                    description: text,
                });
            }} numberOfLines={4} placeholder={'Description'}/>

                        <Picker mode={'dropdown'} style={styles.pickerStyle} selectedValue={this.state.accountOnWhichYouPay} onValueChange={function (itemValue) {
                _this.handleOnValueChangePicker(itemValue);
            }}>
                            <Picker.Item label="Paying account..." value='0'/>
                            {this.state.accounts.map(function (element, key) {
                return _this.renderOneAccountPickerItem(element, key);
            })}

                        </Picker>

                        <Text>Budget on account: {this.state.budgetOnChosenAccount}</Text>


                    </View>


                    <View style={styles.footerView}>
                        <TouchableOpacity style={styles.touchableOpacityLeft} onPress={function () {
                _this.saveBill();
            }}>
                            <Text style={styles.buttonTextStyle}>PAY</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchableOpacityRight} onPress={function () {
                _this.props.onClosePress();
            }}>
                            <Text style={styles.buttonTextStyle}>CLOSE</Text>
                        </TouchableOpacity>
                    </View>

                </View>);
        }
        else {
            return null;
        }
    };
    return NewBillDialog;
}(Component));
export default NewBillDialog;
//# sourceMappingURL=new-bill-dialog.component.js.map