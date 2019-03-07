import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { Text, View, TextInput, Button, ImageBackground, AsyncStorage, ToastAndroid } from 'react-native';
import styles from './top-up.componen.styles';
import ServiceMoney from "../../services/ServiceMoneyManager";
import RegexHolder from "../../services/RegexHolder";
import WithValidatorInput from "../components/WithValidatorInput";
import ConstantsHolder from "../../services/ConstantsHolder";
var backgroundImage = require('../images/register_background.png');
var TopUpComponen = /** @class */ (function (_super) {
    tslib_1.__extends(TopUpComponen, _super);
    function TopUpComponen(props) {
        var _this = _super.call(this, props) || this;
        _this.topUpMoney = function () {
            ServiceMoney.topUpMoney(_this.state.phoneNumber, _this.state.sumToDeposit)
                .then(function (response) {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
                _this.getCurrentBudget();
                _this.freeTheTextInputs();
            })
                .catch(function (error) {
                alert(error);
            });
        };
        _this.loadFromAsyncStorageData = function () {
            AsyncStorage.getItem('phoneNumber')
                .then(function (response) {
                if (response != null) {
                    _this.setState({
                        phoneNumber: response,
                    });
                    _this.getCurrentBudget();
                }
            })
                .catch(function (error) {
                return;
            });
        };
        _this.validateSum = function (field, text, regex) {
            _this.setState(function (prevState) {
                var _a;
                return _a = {},
                    _a[field] = text,
                    _a[field + "Valid"] = regex.test(text) && _this.state.currentBudget + Number(text) <= ConstantsHolder.MAX_BUDGET,
                    _a;
            }, function () {
                _this.setState({
                    allValid: _this.state.sumToDepositValid,
                });
            });
        };
        _this.state = {
            currentBudget: 0,
            phoneNumber: "",
            sumToDeposit: 0,
            allValid: false,
            sumToDepositValid: false,
        };
        var willFocusSubscription = _this.props.navigation.addListener('willFocus', function () {
            _this.loadFromAsyncStorageData();
        });
        return _this;
    }
    TopUpComponen.prototype.getCurrentBudget = function () {
        var _this = this;
        ServiceMoney.getTheActualBudget(this.state.phoneNumber)
            .then(function (response) {
            _this.setState({
                currentBudget: response.sum,
            });
        })
            .catch(function (error) {
            alert(error);
        });
    };
    TopUpComponen.prototype.freeTheTextInputs = function () {
        this.setState({
            sumToDeposit: 0,
        });
    };
    TopUpComponen.prototype.render = function () {
        return (<ImageBackground source={backgroundImage} style={styles.wrapper}>

                <View style={{
            flex: 1,
            width: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column'
        }}>

                    <View>
                        <View>
                            <Text style={{ fontSize: 30, color: 'white' }}> Your Current Budget </Text>
                        </View>
                    </View>


                    <View>
                        <View>
                            <Text style={{ fontSize: 30, color: 'white' }}>{this.state.currentBudget} </Text>
                        </View>
                    </View>
                </View>

                <View style={{ flex: 2, justifyContent: 'flex-start' }}>
                    <TextInput value={this.state.phoneNumber} style={styles.inputTextBox} placeholder="Phone number" keyboardType='numeric' editable={false} underlineColorAndroid={'transparent'}/>

                    <WithValidatorInput value={String(this.state.sumToDeposit == 0 ? "" : this.state.sumToDeposit)} valid={this.state.sumToDepositValid} placeholder={"Sum To Deposit"} validate={this.validateSum} field={"sumToDeposit"} regex={RegexHolder.sumRegex} style={styles.inputTextBox} styleError={styles.inputTextBoxError} keyboardType={'numeric'}/>

                    <View style={styles.buttonView}>
                        <Button title={"Deposit money"} onPress={this.topUpMoney} disabled={!this.state.allValid}/>
                    </View>

                </View>

            </ImageBackground>);
    };
    return TopUpComponen;
}(Component));
export default TopUpComponen;
//# sourceMappingURL=top-up.componen.js.map