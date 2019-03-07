import * as tslib_1 from "tslib";
import React, { Component } from "react";
import { ActivityIndicator, AsyncStorage, ScrollView, ToastAndroid, View } from "react-native";
import ViewAccountsCard from "../components/view-account-card/view-account-card.component";
import Dialog from "react-native-popup-dialog";
import ServiceAccount from "../../services/ServiceAccount";
import NewAccountDialog from "../components/new-account-dialog/new-account-dialog.component";
import styles from "./view-accounts.component.style";
import ServiceUser from "../../services/ServiceUser";
import FloatingButton from "../components/floating-button/floating-button.component";
var ViewAccountsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ViewAccountsComponent, _super);
    function ViewAccountsComponent(props) {
        var _this = _super.call(this, props) || this;
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
        _this.renderAccountItem = function (account, key) {
            var searchText = _this.state.searchText;
            if (account.alias.startsWith(searchText) || searchText == "") {
                return (<ViewAccountsCard key={key} IBAN={account.iban} Budget={account.budget} Alias={account.alias} Currency={account.currency} ImagePath={require("../images/delete_friend.png")} OnPressRightButton={function () {
                    _this.onPressRightTopUpButton(account);
                }} RightButtonColor={"white"} RightButtonImageHeight={"40%"} RightButtonImageWidth={"40%"}/>);
            }
            return null;
        };
        _this.onPressRightTopUpButton = function (account) {
            _this.deleteAccountInAPI(account.id);
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
            return _this.state.accounts.map(function (currentValue, key) {
                return _this.renderAccountItem(currentValue, key);
            });
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
        _this.onDialogAddAccountPress = function (idOwner, currency, alias) {
            _this.addAccountInAPI(idOwner, currency, alias);
        };
        _this.state = {
            isVisible: false,
            loggedInUserId: -1,
            isLoading: true,
            searchText: "",
        };
        var willFocusSubscription = _this.props.navigation.addListener('willFocus', function () {
            _this.getDataFromAsyncStorage();
        });
        return _this;
    }
    ViewAccountsComponent.prototype.deleteAccountInAPI = function (accountID) {
        var _this = this;
        ServiceAccount.deleteAccountById(accountID)
            .then(function (response) {
            ToastAndroid.show("Successfully deleted account!", ToastAndroid.SHORT);
            _this.getDataFromAPI();
        })
            .catch(function (error) {
            alert(error);
        });
    };
    ViewAccountsComponent.prototype.addAccountInAPI = function (idOwner, currency, alias) {
        var _this = this;
        if (alias != "" && currency != "0") {
            ServiceAccount.createAccount(idOwner, currency, alias)
                .then(function (response) {
                ToastAndroid.show("Successfully created a new account!", ToastAndroid.SHORT);
                _this.getDataFromAPI();
                _this.disableDialog();
            })
                .catch(function (error) {
                alert(error);
            });
        }
        else {
            alert("Please complete the fields!");
        }
    };
    ViewAccountsComponent.prototype.renderTopUpDialog = function () {
        return (<NewAccountDialog idOwner={this.state.loggedInUserId} actionOnCancelPress={this.disableDialog} actionOnAddPress={this.onDialogAddAccountPress}/>);
    };
    ;
    ViewAccountsComponent.prototype.render = function () {
        if (this.state.isLoading == false) {
            return (<View style={{ flex: 1 }}>
                    <ScrollView removeClippedSubviews={true}>

                        <Dialog width={300} height={300} visible={this.state.isVisible} children={this.renderTopUpDialog()}/>

                        {this.renderAccountsList()}


                    </ScrollView>

                <FloatingButton action={this.enableDialog}/>
                </View>);
        }
        else {
            return (<View style={styles.loadingViewIndicator}>
                    <ActivityIndicator size={50} color="#3698f0"/>
                </View>);
        }
    };
    return ViewAccountsComponent;
}(Component));
export default ViewAccountsComponent;
//# sourceMappingURL=view-accounts.component.js.map