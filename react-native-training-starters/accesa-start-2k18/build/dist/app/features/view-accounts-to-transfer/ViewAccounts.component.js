import * as tslib_1 from "tslib";
import React, { Component } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";
import ViewAccountsCard from "../components/ViewAccountsCard/ViewAccountsCard";
import { AppRoutes } from "../../app.routes";
import ServiceAccount from "../../services/ServiceAccount";
import styles from "./ViewAccounts.component.style";
var ViewAccountsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ViewAccountsComponent, _super);
    function ViewAccountsComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.navigateToViewFriendsToTransfer = function (accountId) {
            _this.props.navigation.navigate(AppRoutes.view_friends_to_transfer_money, { "accountID": accountId });
        };
        _this.getDataFromAPI = function () {
            ServiceAccount.getAccountsOfUser(1)
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
        _this.onTransferButtonPress = function (accountId) {
            _this.navigateToViewFriendsToTransfer(accountId);
        };
        _this.renderAccountItem = function (account, key) {
            var searchText = _this.state.searchText;
            if (account.alias.startsWith(searchText) || searchText == "") {
                return (<ViewAccountsCard key={key} IBAN={account.iban} Budget={account.budget} Alias={account.alias} Currency={account.currency} ImagePath={require("../images/transfer_money_image.png")} OnPressRightButton={_this.onTransferButtonPress} RightButtonParameter={account.id}/>);
            }
            return null;
        };
        _this.renderAccountsList = function () {
            var list = _this.state.accounts.map(function (currentValue, key) {
                return _this.renderAccountItem(currentValue, key);
            });
            return list;
        };
        _this.state = {
            accounts: [],
            searchText: "",
            isLoading: true,
        };
        var willFocusSubscription = _this.props.navigation.addListener('willFocus', function () {
            _this.getDataFromAPI();
        });
        return _this;
    }
    ViewAccountsComponent.prototype.render = function () {
        if (this.state.isLoading == false) {
            return (<ScrollView>

                    {this.renderAccountsList()}

                </ScrollView>);
        }
        return (<View style={styles.loadingViewIndicator}>
                <ActivityIndicator size={50} color="#36BB60"/>
            </View>);
    };
    return ViewAccountsComponent;
}(Component));
export default ViewAccountsComponent;
//# sourceMappingURL=ViewAccounts.component.js.map