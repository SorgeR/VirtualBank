import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, Picker, Text, TextInput, TouchableOpacity, View } from "react-native";
import styles from "./deposit-create-dialog.component.style";
import ServiceUser from "../../../services/ServiceUser";
var DepositCreateDialog = /** @class */ (function (_super) {
    tslib_1.__extends(DepositCreateDialog, _super);
    function DepositCreateDialog(props) {
        var _this = _super.call(this, props) || this;
        _this.handleOnValueChangePicker = function (itemValue) {
            if (itemValue != 0) {
                _this.setState({
                    chosenAccountId: itemValue,
                }, function () {
                    _this.findIBANOfAccountWithID(_this.state.chosenAccountId);
                });
            }
        };
        _this.findIBANOfAccountWithID = function (id) {
            var found = _this.state.accounts.find(function (el) { return el.id == id; });
            _this.setState({
                budgetOnChosenAccount: found.budget,
                chosenAccountIBAN: found.iban
            });
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
        _this.addDeposit = function () {
            var _a = _this.state, chosenAccountId = _a.chosenAccountId, loggedInUserId = _a.loggedInUserId, title = _a.title, initialSum = _a.initialSum, budgetOnChosenAccount = _a.budgetOnChosenAccount;
            if (chosenAccountId == 0) {
                alert("Please choose an account!");
                return;
            }
            if (initialSum <= 0) {
                alert("The initial sum must be greater than 0!");
                return;
            }
            if (title == "") {
                alert("Please enter a title!");
                return;
            }
            if (initialSum > budgetOnChosenAccount) {
                alert("You do not have enough money on this account!");
                return;
            }
            _this.props.addDeposit(chosenAccountId, loggedInUserId, title, initialSum);
        };
        _this.state = {
            accounts: [],
            idUser: 0,
            title: "",
            initialSum: 0,
            isLoading: true,
            budgetOnChosenAccount: 0,
            chosenAccountId: 0,
            loggedInUserId: 0,
            chosenAccountIBAN: "",
        };
        _this.getDataFromAsyncStorage();
        return _this;
    }
    DepositCreateDialog.prototype.render = function () {
        var _this = this;
        if (this.state.isLoading == false) {
            return (<View style={styles.wrapper}>
                    <View style={styles.headerView}>
                        <Text style={styles.titleText}>Create Deposit</Text>
                    </View>

                    <View style={styles.middleView}>
                        <TextInput placeholder={"Title"} onChangeText={function (text) {
                _this.setState({
                    title: text,
                });
            }} style={styles.textInput} underlineColorAndroid={'transparent'}/>

                        <TextInput style={styles.textInput} keyboardType={'numeric'} placeholder={"Sum to deposit"} onChangeText={function (text) {
                _this.setState({
                    initialSum: Number(text),
                });
            }} underlineColorAndroid={'transparent'}/>

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
                _this.addDeposit();
            }}>
                            <Text style={styles.buttonTextStyle}>DEPOSIT</Text>
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
            return (<View style={styles.loadingViewIndicator}>
                    <ActivityIndicator size={50} color="#3698f0"/>
                </View>);
        }
    };
    return DepositCreateDialog;
}(Component));
export default DepositCreateDialog;
//# sourceMappingURL=deposit-create-dialog.component.js.map