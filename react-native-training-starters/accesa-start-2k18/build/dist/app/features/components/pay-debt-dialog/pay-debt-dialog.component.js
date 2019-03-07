import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { AsyncStorage, Picker, Text, TouchableOpacity, View } from "react-native";
import styles from "./pay-debt-dialog.component.style";
import ServiceUser from "../../../services/ServiceUser";
var PayDebtDialog = /** @class */ (function (_super) {
    tslib_1.__extends(PayDebtDialog, _super);
    function PayDebtDialog(props) {
        var _this = _super.call(this, props) || this;
        _this.findIBANOfAccountWithID = function (id) {
            var found = _this.state.accounts.find(function (el) { return el.id == id; });
            _this.setState({
                budgetOnChosenAccount: found.budget,
                chosenAccountIBAN: found.iban
            });
        };
        _this.handleOnValueChangePicker = function (itemValue) {
            if (itemValue != 0) {
                _this.setState({
                    chosenAccountId: itemValue,
                }, function () {
                    _this.findIBANOfAccountWithID(_this.state.chosenAccountId);
                });
            }
        };
        _this.getDataFromAsyncStorage = function () {
            AsyncStorage.getItem('id')
                .then(function (response) {
                if (response != null) {
                    _this.setState({
                        loggedInUserId: Number(response),
                    }, function () {
                        _this.loadOwnerAccounts();
                    });
                }
            })
                .catch(function (error) {
                alert(error);
            });
        };
        _this.payDebt = function () {
            var chosenAccountId = _this.state.chosenAccountId;
            var _a = _this.props, idDestinationAccount = _a.idDestinationAccount, sumToPay = _a.sumToPay, idDebt = _a.idDebt;
            if (chosenAccountId == 0 || chosenAccountId == -1) {
                alert("Please choose an account!");
                return;
            }
            if (_this.state.budgetOnChosenAccount < sumToPay) {
                alert("You do not have enough money on this account!");
                return;
            }
            _this.props.onPayButtonPress(idDebt, chosenAccountId, idDestinationAccount, sumToPay);
        };
        _this.loadOwnerAccounts = function () {
            ServiceUser.getAccounts(_this.state.loggedInUserId)
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
            loggedInUserId: 0,
            budgetOnChosenAccount: 0,
            accounts: [],
            chosenAccountId: 0,
            chosenAccountIBAN: "",
            isLoading: true,
        };
        _this.getDataFromAsyncStorage();
        return _this;
    }
    PayDebtDialog.prototype.render = function () {
        var _this = this;
        if (this.state.isLoading == false) {
            return (<View style={styles.wrapper}>
                    <View style={styles.headerView}>
                        <Text style={styles.titleText}>Pay Debt</Text>
                    </View>

                    <View style={styles.middleView}>

                        <Picker mode={'dropdown'} style={styles.pickerStyle} selectedValue={this.state.chosenAccountId} onValueChange={function (itemValue) {
                _this.handleOnValueChangePicker(itemValue);
            }}>
                            <Picker.Item label="Choose the account..." value='0'/>
                            {this.state.accounts.map(function (element, key) {
                return _this.renderOneAccountPickerItem(element, key);
            })}

                        </Picker>

                        <Text>Budget of account: {this.state.budgetOnChosenAccount}</Text>


                    </View>


                    <View style={styles.footerView}>
                        <TouchableOpacity style={styles.touchableOpacityLeft} onPress={function () {
                _this.payDebt();
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
    return PayDebtDialog;
}(Component));
export default PayDebtDialog;
//# sourceMappingURL=pay-debt-dialog.component.js.map