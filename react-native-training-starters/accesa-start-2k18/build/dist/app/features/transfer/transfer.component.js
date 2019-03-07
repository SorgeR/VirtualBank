import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { Button, Text, TextInput, View, Image, ToastAndroid, AsyncStorage } from 'react-native';
import styles from "./transfer.component.styles";
var fromImage = require('../images/register_background.png');
var toImage = require('../images/register_background.png');
var arrowImage = require('../images/arrow.png');
import ServiceMoney from "../../services/ServiceMoneyManager";
import RegexHolder from "../../services/RegexHolder";
import WithCardValidatorInput from '../components/WithCardValidatorInput';
var TransferComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TransferComponent, _super);
    function TransferComponent(props) {
        var _this = _super.call(this, props) || this;
        //transfers money
        _this.transferMoney = function () {
            ServiceMoney.transferMoney(_this.state.fromPhone, _this.state.toPhone, _this.state.sumToTransfer)
                .then(function (response) {
                ToastAndroid.show(response.message, ToastAndroid.SHORT);
                _this.getCurrentBudget();
                _this.freeTheTextInputs();
            })
                .catch(function (error) {
                alert(error);
            });
        };
        //loads the data from async storage
        _this.loadFromAsyncStorageData = function () {
            AsyncStorage.getItem('phoneNumber')
                .then(function (response) {
                if (response != null) {
                    _this.setState({
                        fromPhone: response,
                    });
                    _this.getCurrentBudget();
                }
            })
                .catch(function (error) {
                return;
            });
        };
        _this.validate = function (field, text, regex) {
            _this.setState(function (prevState) {
                var _a;
                return _a = {},
                    _a[field] = text,
                    _a[field + "Valid"] = regex.test(text),
                    _a;
            }, function () {
                _this.setState({
                    allValid: _this.state.sumToTransferValid && _this.state.toPhoneValid
                });
            });
        };
        //validates the sum from the state
        _this.validateSum = function (field, text, regex) {
            _this.setState(function (prevState) {
                var _a;
                return _a = {},
                    _a[field] = text,
                    _a[field + "Valid"] = regex.test(text) && Number(text) <= _this.state.currentBudget,
                    _a;
            }, function () {
                _this.setState({
                    allValid: _this.state.sumToTransferValid && _this.state.toPhoneValid
                });
            });
        };
        _this.state = {
            fromPhone: "",
            toPhone: "",
            sumToTransfer: 0.0,
            currentBudget: 0.0,
            sumToTransferValid: false,
            toPhoneValid: false,
            currentReceiverBudget: 0.0,
        };
        //loading the data from async storage every time we access on this page
        var willFocusSubscription = _this.props.navigation.addListener('willFocus', function () {
            _this.loadFromAsyncStorageData();
        });
        return _this;
    }
    TransferComponent.prototype.getCurrentBudget = function () {
        var _this = this;
        ServiceMoney.getTheActualBudget(this.state.fromPhone)
            .then(function (response) {
            _this.setState({
                currentBudget: response.sum,
            });
        })
            .catch(function (error) {
            alert(error);
        });
    };
    TransferComponent.prototype.freeTheTextInputs = function () {
        this.setState({
            sumToTransfer: 0,
            toPhone: "",
        });
    };
    TransferComponent.prototype.render = function () {
        return (<View style={styles.mainContainer}>

                <View style={styles.topImageContainer}>

                    <View style={{ flex: 2, }}>
                        <Image style={styles.roundImageView} resizeMode={'contain'} source={fromImage}/>
                    </View>

                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Image style={styles.arrowImageView} resizeMode={'contain'} source={arrowImage}/>
                    </View>

                    <View style={{ flex: 2 }}>
                        <Image style={styles.roundImageView} resizeMode={'contain'} source={toImage}/>
                    </View>
                </View>

                <View style={styles.card}>
                    <View style={styles.topContainer}>


                        <View style={{ width: '60%', marginTop: 7 }}>
                            <View>
                                <Text style={styles.topLeftText}> Your Current Budget </Text>
                            </View>
                        </View>

                        <View style={{ width: '40%', marginTop: 7 }}>
                            <View>
                                <Text style={styles.topRightText}> {this.state.currentBudget}</Text>
                            </View>


                        </View>
                    </View>
                </View>


                <View style={styles.phoneInputContainer}>

                    <View style={styles.card}>
                        <View style={{ width: '50%' }}>

                            <TextInput style={styles.leftInputTextBox} placeholderTextColor='grey' underlineColorAndroid={'transparent'} placeholder="From" value={this.state.fromPhone} editable={false}/>
                        </View>
                    </View>


                    <WithCardValidatorInput value={this.state.toPhone} valid={this.state.toPhoneValid} placeholder={"To"} validate={this.validate} field={"toPhone"} regex={RegexHolder.phoneNumberRegex} style={styles.rightInputTextBox} styleError={styles.rightInputTextBox} keyboardType={'numeric'} cardNormalStyle={styles.card} cardErrorStyle={styles.cardError}/>


                </View>


                <WithCardValidatorInput value={this.state.sumToTransfer == 0 ? "" : String(this.state.sumToTransfer)} valid={this.state.sumToTransferValid} placeholder={"Sum to transfer"} validate={this.validateSum} field={"sumToTransfer"} regex={RegexHolder.sumRegex} style={styles.middleTextBox} styleError={styles.middleTextBox} keyboardType={'numeric'} cardNormalStyle={styles.card} cardErrorStyle={styles.cardError}/>


                <View style={{ alignItems: 'center', flex: 1 }}>
                    <View style={styles.transferButtonView}>
                        <Button title={"Transfer now!"} onPress={this.transferMoney} disabled={!this.state.allValid}/>
                    </View>
                </View>


            </View>);
    };
    return TransferComponent;
}(Component));
export default TransferComponent;
//# sourceMappingURL=transfer.component.js.map