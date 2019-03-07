import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import ServiceUser from "../../services/ServiceUser";
import { ActivityIndicator, AsyncStorage, ScrollView, View } from "react-native";
import ViewPersonalDebtorsCard from "../components/view-personal-debtors-card/view-personal-debtors-card.component";
import { AppRoutes } from "../../app.routes";
import styles from "./debts.component.style";
var FriendDebtsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(FriendDebtsComponent, _super);
    function FriendDebtsComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.getDataFromAsyncStorage = function () {
            AsyncStorage.getItem('id')
                .then(function (response) {
                if (response != null) {
                    _this.setState({
                        loggedInUserID: Number(response),
                    }, function () {
                        _this.getDebtorsOfUserFromAPI();
                    });
                }
            })
                .catch(function (error) {
                alert(error);
            });
        };
        _this.getDebtorsOfUserFromAPI = function () {
            ServiceUser.getDebtorsOfUser(_this.state.loggedInUserID)
                .then(function (response) {
                _this.setState({
                    debtors: response.data,
                }, function () {
                    _this.setState({
                        isLoading: false,
                    });
                });
            })
                .catch(function (error) {
                alert(error);
            });
        };
        _this.renderOneDebtor = function (debtor, key) {
            return (<ViewPersonalDebtorsCard key={key} billName={debtor.billName} sumToPay={debtor.sumToGet} debtorFirstName={debtor.debtorFirstName} debtorLastName={debtor.debtorLastName} messageDebtorFunction={function () {
                _this.props.navigation.navigate(AppRoutes.chat, { "friendID": debtor.debtorId });
            }}/>);
        };
        _this.renderDebtors = function () {
            return _this.state.debtors.map(function (currentValue, key) {
                return _this.renderOneDebtor(currentValue, key);
            });
        };
        _this.state = {
            isLoading: true,
            debtors: [],
            loggedInUserID: 0,
        };
        _this.getDataFromAsyncStorage();
        return _this;
    }
    FriendDebtsComponent.prototype.render = function () {
        if (this.state.isLoading == false) {
            return (<View style={styles.wrapper}>
                    <ScrollView>
                        {this.renderDebtors()}
                    </ScrollView>
                </View>);
        }
        else {
            return (<View style={styles.loadingViewIndicator}>
                    <ActivityIndicator size={50} color="#3698f0"/>
                </View>);
        }
    };
    return FriendDebtsComponent;
}(Component));
export default FriendDebtsComponent;
//# sourceMappingURL=friend-debts.component.js.map