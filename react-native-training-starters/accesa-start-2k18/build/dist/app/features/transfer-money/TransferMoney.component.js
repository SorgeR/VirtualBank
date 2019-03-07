import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { View, Text, Picker, Button, ActivityIndicator } from "react-native";
import ViewFriendsCard from "../components/ViewFriendsCard/ViewFriendsCard";
import styles from "./transfer-money.component.style";
import ServiceUser from "../../services/ServiceUser";
import ServiceAccount from "../../services/ServiceAccount";
import ServiceOperation from '../../services/ServiceOperation';
import RegexHolder from "../../services/RegexHolder";
import WithValidatorInput from "../components/WithValidatorInput";
var TransferMoneyComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TransferMoneyComponent, _super);
    function TransferMoneyComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.setOnLoadingState = function () {
            _this.setState({
                isLoading: !(_this.state.loadSourceAccountDataFromAPISolved &&
                    _this.state.loadDestinationUserDataFromAPISolved &&
                    _this.state.loadDestinationUserAccountsFromAPISolved),
            });
        };
        _this.loadDestinationUserDataFromAPI = function () {
            ServiceUser.getUserByID(_this.state.userID)
                .then(function (response) {
                _this.setState({
                    user: response,
                }, function () {
                    _this.setState({
                        loadDestinationUserDataFromAPISolved: true,
                    }, function () {
                        _this.setOnLoadingState();
                    });
                });
            })
                .catch(function (error) {
                alert("error");
            });
        };
        _this.loadSourceAccountDataFromAPI = function () {
            ServiceAccount.getAccountById(_this.state.accountID)
                .then(function (response) {
                _this.setState({
                    sourceAccount: response,
                }, function () {
                    _this.setState({
                        loadSourceAccountDataFromAPISolved: true,
                    }, function () {
                        _this.setOnLoadingState();
                    });
                });
            })
                .catch(function (error) {
                alert("error");
            });
        };
        _this.transferMoneyBetweenAccountsInAPI = function () {
            var _a = _this.state, accountID = _a.accountID, chosenAccountID = _a.chosenAccountID, sumToTransfer = _a.sumToTransfer;
            ServiceOperation.transferMoneyBetweenAccounts(accountID, chosenAccountID, sumToTransfer)
                .then(function (response) {
                alert("Successfully transferred the money!");
                _this.loadSourceAccountDataFromAPI();
            })
                .catch(function (error) {
                alert(error);
            });
        };
        _this.loadDestinationUserAccountsFromAPI = function () {
            ServiceAccount.getAccountsOfUser(_this.state.userID)
                .then(function (response) {
                _this.setState({
                    destinationAccounts: response.data,
                }, function () {
                    _this.setState({
                        loadDestinationUserAccountsFromAPISolved: true,
                    }, function () {
                        _this.setOnLoadingState();
                    });
                });
            })
                .catch(function (error) {
                alert("error");
            });
        };
        _this.renderDestinationUserPersonalData = function (user) {
            return (<View style={styles.wrapperCardView}>
                <ViewFriendsCard phoneNumber={user.phoneNumber} firstName={user.firstName} lastName={user.lastName} OnPressRightButton={function () {
            }} RightButtonParameter={null} ImagePath={require("../images/friends_icon.png")} rightButtonColor={"white"}/>
            </View>);
        };
        _this.renderSourceAccountData = function (sourceAccount) {
            return (<View style={styles.sourceAccountDataWrapper}>
                <Text style={styles.textIBAN}>Source
                    account</Text>
                <Text style={styles.textIBAN}>{sourceAccount.iban}</Text>
                <Text style={styles.textBudget}>Budget {sourceAccount.budget} {sourceAccount.currency} </Text>

            </View>);
        };
        _this.renderOneAccountPickerItem = function (account, key) {
            return <Picker.Item key={key} label={account.iban} value={account.id}/>;
        };
        _this.findIBANOfAccountWithID = function (id) {
            var found = _this.state.destinationAccounts.find(function (el) { return el.id == id; });
            _this.setState({
                chosenIBAN: found.iban,
            });
        };
        _this.handleOnValueChangePicker = function (itemValue) {
            if (itemValue != 0) {
                _this.setState({
                    chosenAccountID: itemValue,
                }, function () {
                    _this.findIBANOfAccountWithID(_this.state.chosenAccountID);
                });
            }
        };
        _this.renderAccountPickerData = function () {
            return (<View style={styles.pickerWrapperStyle}>
                <Picker mode={'dropdown'} style={styles.pickerStyle} selectedValue={_this.state.chosenAccountID} onValueChange={function (itemValue) { _this.handleOnValueChangePicker(itemValue); }}>
                    <Picker.Item label="Select your friend's IBAN..." value='0'/>
                    {_this.state.destinationAccounts.map(function (element, key) {
                return _this.renderOneAccountPickerItem(element, key);
            })}
                </Picker>

            </View>);
        };
        _this.validate = function (field, text, regex) {
            _this.setState(function (prevState) {
                var _a;
                return _a = {},
                    _a[field] = text,
                    _a[field + 'Valid'] = regex.test(text),
                    _a;
            }, function () {
                _this.setState({
                    allValid: (_this.state.sumToTransferValid && _this.state.sourceAccount.budget >= _this.state.sumToTransfer)
                });
            });
        };
        _this.state = {
            accountID: _this.props.navigation.getParam("accountID", "default"),
            userID: _this.props.navigation.getParam("friendID", "default"),
            isLoading: true,
            chosenIBAN: "",
            loadDestinationUserAccountsFromAPISolved: false,
            loadDestinationUserDataFromAPISolved: false,
            loadSourceAccountDataFromAPISolved: false,
            chosenAccountID: -1,
            sumToTransfer: 0,
            sumToTransferValid: false,
            allValid: false,
        };
        var willFocusSubscription = _this.props.navigation.addListener('willFocus', function () {
            _this.loadDestinationUserDataFromAPI();
            _this.loadDestinationUserAccountsFromAPI();
            _this.loadSourceAccountDataFromAPI();
        });
        return _this;
    }
    TransferMoneyComponent.prototype.render = function () {
        var _this = this;
        if (this.state.isLoading == false) {
            return (<View style={styles.wrapper}>

                    <View style={styles.wrapperForPersonalData}>
                        {this.renderDestinationUserPersonalData(this.state.user)}
                    </View>

                    <View style={styles.wrapperForNotPersonalData}>

                        {this.renderSourceAccountData(this.state.sourceAccount)}

                        <View style={styles.horizontalLineStyle}/>

                        <View style={styles.destinationAccountAndActionsWrapperStyle}>
                            <View style={styles.pickerAndDestinationAccountWrapperStyle}>
                                <Text style={styles.textDestinationAccountStyle}>Destination account</Text>
                                {this.renderAccountPickerData()}

                            </View>
                            <View style={styles.horizontalLineStyle}/>
                            <View style={styles.inputCurrencyAndButtonWrapperStyle}>

                                <View style={styles.textInputAndCurrencyWrapperStyle}>


                                <WithValidatorInput value={this.state.sumToTransfer == 0 ? "" : this.state.sumToTransfer.toString()} valid={this.state.sumToTransferValid} placeholder={"0"} validate={this.validate} field={"sumToTransfer"} regex={RegexHolder.sumRegex} style={styles.inputTextBox} styleError={styles.inputTextBoxError} keyboardType={'numeric'}/>
                                    <Text style={styles.textCurrencyStyle}>RON</Text>
                                </View>
                                <View style={styles.buttonWrapperStyle}>
                                    <Button onPress={function () { _this.transferMoneyBetweenAccountsInAPI(); }} disabled={!this.state.allValid} title={"SEND MONEY"} color={"#45E177"}/>
                                </View>
                            </View>

                        </View>


                    </View>
                </View>);
        }
        else {
            return (<View style={styles.loadingViewIndicator}>
                    <ActivityIndicator size={50} color="#36BB60"/>
                </View>);
        }
    };
    return TransferMoneyComponent;
}(Component));
export default TransferMoneyComponent;
//# sourceMappingURL=TransferMoney.component.js.map