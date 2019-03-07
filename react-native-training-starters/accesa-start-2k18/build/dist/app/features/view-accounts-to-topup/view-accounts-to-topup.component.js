import * as tslib_1 from "tslib";
import React, { Component } from "react";
import { ActivityIndicator, AsyncStorage, ScrollView, ToastAndroid, View } from "react-native";
import ViewAccountsCard from "../components/view-account-card/view-account-card.component";
import Dialog from "react-native-popup-dialog";
import TopUpDialog from "../components/top-up-dialog/top-up-dialog.component";
import ServiceAccount from "../../services/ServiceAccount";
import styles from "./view-accounts-to-topup.component.style";
import RegexHolder from "../../services/RegexHolder";
import ServiceUser from "../../services/ServiceUser";
var ViewAccountsToTopupComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ViewAccountsToTopupComponent, _super);
    function ViewAccountsToTopupComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.validSum = function (sum) {
            var valid = RegexHolder.sumRegex.test(sum.toString());
            return valid;
        };
        _this.getDataFromAPI = function () {
            ServiceUser.getAccounts(_this.state.loggedInUserId)
                .then(function (response) {
                _this.setState({
                    accounts: response.data,
                }, function () {
                    _this.setState({
                        isLoading: false,
                    });
                });
            })
                .catch(function (error) {
                alert("error");
            });
        };
        _this.onPressRightTopUpButton = function (account) {
            _this.setState({
                chosenId: account.id,
                chosenIBAN: account.iban,
                chosenAlias: account.alias,
                chosenCurrency: account.currency,
                chosenBudget: account.budget
            }, function () {
                _this.enableDialog();
            });
        };
        _this.renderAccountItem = function (account, key) {
            var searchText = _this.state.searchText;
            if (account.alias.startsWith(searchText) || searchText == "") {
                return (<ViewAccountsCard key={key} IBAN={account.iban} Budget={account.budget} Alias={account.alias} Currency={account.currency} ImagePath={require("../images/save_money_image3.png")} OnPressRightButton={function () {
                    _this.onPressRightTopUpButton(account);
                }} RightButtonImageHeight={'70%'} RightButtonImageWidth={"70%"} RightButtonColor={"#45E177"}/>);
            }
            return null;
        };
        _this.getDataFromAsyncStorage = function () {
            AsyncStorage.getItem('id')
                .then(function (response) {
                if (response != null) {
                    _this.setState({
                        loggedInUserId: Number(response),
                    }, function () {
                        _this.getDataFromAPI();
                    });
                }
            })
                .catch(function (error) {
                alert('error');
            });
        };
        _this.renderAccountsList = function () {
            var list = _this.state.accounts.map(function (currentValue, key) {
                return _this.renderAccountItem(currentValue, key);
            });
            return list;
        };
        _this.disableDialog = function () {
            _this.setState({
                isVisible: false,
            });
        };
        _this.enableDialog = function () {
            _this.setState({
                isVisible: true,
            });
        };
        _this.topUpMoneyInAPI = function (accountId, sumToTransfer) {
            if (_this.validSum(sumToTransfer)) {
                ServiceAccount.topUpAccount(accountId, sumToTransfer)
                    .then(function (response) {
                    ToastAndroid.show("Successfully deposited money!", ToastAndroid.SHORT);
                    _this.getDataFromAPI();
                    _this.disableDialog();
                })
                    .catch(function (error) {
                    alert(error);
                });
            }
            else {
                alert("The sum is not valid!");
            }
        };
        _this.addTopUp = function (accountId, sumToTransfer) {
            _this.topUpMoneyInAPI(accountId, sumToTransfer);
        };
        _this.state = {
            isVisible: false,
            chosenId: -1,
            chosenIBAN: "",
            chosenAlias: "",
            chosenCurrency: "",
            loggedInUserId: -1,
            isLoading: true,
            searchText: "",
            sumToTransfer: 0,
            chosenBudget: 0,
        };
        var willFocusSubscription = _this.props.navigation.addListener('willFocus', function () {
            _this.getDataFromAsyncStorage();
        });
        return _this;
    }
    ViewAccountsToTopupComponent.prototype.renderTopUpDialog = function () {
        var _a = this.state, chosenBudget = _a.chosenBudget, chosenId = _a.chosenId, chosenIBAN = _a.chosenIBAN, chosenCurrency = _a.chosenCurrency, chosenAlias = _a.chosenAlias;
        return (<TopUpDialog IBAN={chosenIBAN} alias={chosenAlias} currency={chosenCurrency} actionOnCancelPress={this.disableDialog} actionOnAddPress={this.addTopUp} idAccount={chosenId} budget={chosenBudget}/>);
    };
    ViewAccountsToTopupComponent.prototype.render = function () {
        if (this.state.isLoading == false) {
            return (<ScrollView removeClippedSubviews={true}>

                    <Dialog width={300} height={300} visible={this.state.isVisible} children={this.renderTopUpDialog()}/>

                    {this.renderAccountsList()}


                </ScrollView>);
        }
        else {
            return (<View style={styles.loadingViewIndicator}>
                    <ActivityIndicator size={50} color="#3698f0"/>
                </View>);
        }
    };
    return ViewAccountsToTopupComponent;
}(Component));
export default ViewAccountsToTopupComponent;
//# sourceMappingURL=view-accounts-to-topup.component.js.map