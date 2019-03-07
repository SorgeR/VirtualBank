import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, ScrollView, ToastAndroid, View } from "react-native";
import ServiceUser from "../../services/ServiceUser";
import PayDebtCard from "../components/pay-debt-card/pay-debt-card.component";
import styles from "./debts.component.style";
import Dialog from "react-native-popup-dialog";
import PayDebtDialog from "../components/pay-debt-dialog/pay-debt-dialog.component";
import ServiceBill from "../../services/ServiceBill";
import { AppRoutes } from "../../app.routes";
var MyDebtsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(MyDebtsComponent, _super);
    function MyDebtsComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.getDataFromAsyncStorage = function () {
            AsyncStorage.getItem('id')
                .then(function (response) {
                if (response != null) {
                    _this.setState({
                        loggedInUserId: Number(response),
                    }, function () {
                        _this.getDebtsFromAPI();
                    });
                }
            })
                .catch(function (error) {
                alert(error);
            });
        };
        _this.getDebtsFromAPI = function () {
            ServiceUser.getDebtsToPay(_this.state.loggedInUserId)
                .then(function (response) {
                _this.setState({
                    debts: response.data,
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
        _this.renderOneDebt = function (debt, key) {
            return (<PayDebtCard key={key} billName={debt.billName} sumToPay={debt.sumToPay} creatorAccountId={debt.creatorAccountId} creatorIBAN={debt.creatorIBAN} creatorFirstName={debt.creatorFirstName} creatorLastName={debt.creatorLastName} payDebtFunction={function () {
                _this.setState({
                    destinationAccountId: debt.creatorAccountId,
                    sumToPay: debt.sumToPay,
                    idDebt: debt.idDebt,
                }, function () {
                    _this.enableDialog();
                });
            }} payLaterFunction={function () {
                _this.setState({
                    destinationUserId: debt.idCreator,
                }, function () {
                    _this.navigateToChat();
                });
            }}/>);
        };
        _this.renderDebts = function () {
            return _this.state.debts.map(function (currentValue, key) {
                return _this.renderOneDebt(currentValue, key);
            });
        };
        _this.payDebt = function (idDebt, sourceAccount, destinationAccount, sumToPay) {
            ServiceBill.payDebt(idDebt, sourceAccount, destinationAccount, sumToPay)
                .then(function (response) {
                ToastAndroid.show("Successfully transferred the money!", ToastAndroid.SHORT);
                _this.getDebtsFromAPI();
            })
                .catch(function (error) {
                alert(error);
            });
            _this.disableDialog();
        };
        _this.renderPayDebtDialog = function () {
            return (<PayDebtDialog idDestinationAccount={_this.state.destinationAccountId} sumToPay={_this.state.sumToPay} idDebt={_this.state.idDebt} onPayButtonPress={_this.payDebt} onClosePress={_this.disableDialog}/>);
        };
        _this.enableDialog = function () {
            _this.setState({
                isVisible: true,
            });
        };
        _this.disableDialog = function () {
            _this.setState({
                isVisible: false,
            });
        };
        _this.navigateToChat = function () {
            _this.props.navigation.navigate(AppRoutes.chat, { "friendID": _this.state.destinationUserId });
        };
        _this.state = {
            debts: [],
            loggedInUserId: 0,
            isLoading: true,
            isVisible: false,
            destinationAccountId: 0,
            sumToPay: 0,
            idDebt: 0,
            destinationUserId: 0,
        };
        _this.props.navigation.addListener('willFocus', function () {
            _this.getDataFromAsyncStorage();
        });
        return _this;
    }
    MyDebtsComponent.prototype.render = function () {
        if (this.state.isLoading == false) {
            return (<View style={styles.wrapper}>
                    <ScrollView removeClippedSubviews={true}>
                        <Dialog width={300} height={200} visible={this.state.isVisible} children={this.renderPayDebtDialog()}/>
                        {this.renderDebts()}
                    </ScrollView>
                </View>);
        }
        else {
            return (<View style={styles.loadingViewIndicator}>
                    <ActivityIndicator size={50} color="#3698f0"/>
                </View>);
        }
    };
    ;
    return MyDebtsComponent;
}(Component));
export default MyDebtsComponent;
//# sourceMappingURL=my-debts.component.js.map