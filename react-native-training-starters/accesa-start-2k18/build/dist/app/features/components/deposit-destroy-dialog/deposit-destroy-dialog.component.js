import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { AsyncStorage, Picker, Text, TouchableOpacity, View } from "react-native";
import styles from "./deposit-destroy-dialog.component.style";
import ServiceUser from "../../../services/ServiceUser";
var DepositDestroyDialog = /** @class */ (function (_super) {
    tslib_1.__extends(DepositDestroyDialog, _super);
    function DepositDestroyDialog(props) {
        var _this = _super.call(this, props) || this;
        _this.destroyDeposit = function () {
            _this.props.onDestroyButtonPress(_this.props.idDeposit, _this.state.chosenAccountId);
        };
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
    DepositDestroyDialog.prototype.render = function () {
        var _this = this;
        if (this.state.isLoading == false) {
            return (<View style={styles.wrapper}>
                    <View style={styles.headerView}>
                        <Text style={styles.titleText}>Destroy Deposit</Text>
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
                _this.destroyDeposit();
            }}>
                            <Text style={styles.buttonTextStyle}>DESTROY</Text>
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
    return DepositDestroyDialog;
}(Component));
export default DepositDestroyDialog;
//# sourceMappingURL=deposit-destroy-dialog.component.js.map