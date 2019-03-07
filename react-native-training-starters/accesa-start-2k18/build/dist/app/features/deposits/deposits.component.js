import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, ScrollView, View, ToastAndroid } from "react-native";
import FloatingButton from "../components/floating-button/floating-button.component";
import Dialog from "react-native-popup-dialog";
import ServiceUser from "../../services/ServiceUser";
import DepositCard from "../components/deposit-card/deposit-card.component";
import styles from "../search-friends/SearchFriends.component.style";
import DepositCreateDialog from "../components/deposit-create-dialog/deposit-create-dialog.component";
import ServiceAccount from "../../services/ServiceAccount";
import DepositDestroyDialog from "../components/deposit-destroy-dialog/deposit-destroy-dialog.component";
var DepositsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(DepositsComponent, _super);
    function DepositsComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.getDepositsFromAPI = function () {
            ServiceUser.getDepositsOfUser(_this.state.loggedInUserId)
                .then(function (response) {
                _this.setState({
                    deposits: response.data,
                }, function () {
                    _this.setState({
                        isLoading: false,
                    });
                });
            });
        };
        _this.getDataFromAsyncStorage = function () {
            AsyncStorage.getItem('id')
                .then(function (response) {
                if (response != null) {
                    _this.setState({
                        loggedInUserId: Number(response),
                    }, function () {
                        _this.getDepositsFromAPI();
                    });
                }
            })
                .catch(function (error) {
                alert(error);
            });
        };
        _this.enableDestroyDialog = function () {
            _this.setState({
                destroyDialogIsVisible: true,
            });
        };
        _this.disableDestroyDialog = function () {
            _this.setState({
                destroyDialogIsVisible: false,
            });
        };
        _this.renderOneDeposit = function (deposit, key) {
            return (<DepositCard key={key} title={deposit.title} sumToGet={deposit.initialSum} date={deposit.createDate.toString().substr(0, 10)} enableDialog={function () {
                _this.setState({
                    chosenDeposit: deposit.id,
                }, function () {
                    _this.enableDestroyDialog();
                });
            }}/>);
        };
        _this.renderDeposits = function () {
            return _this.state.deposits.map(function (currentValue, key) {
                return _this.renderOneDeposit(currentValue, key);
            });
        };
        _this.enableAddDialog = function () {
            _this.setState({
                addDialogIsVisible: true,
            });
        };
        _this.disableAddDialog = function () {
            _this.setState({
                addDialogIsVisible: false,
            });
        };
        _this.createDeposit = function (idAccount, idUser, title, initialSum) {
            ServiceAccount.createDeposit(idAccount, idUser, title, initialSum)
                .then(function (response) {
                ToastAndroid.show("Successfully created a new deposit!", ToastAndroid.SHORT);
                _this.disableAddDialog();
                _this.getDepositsFromAPI();
            })
                .catch(function (error) {
                alert(error);
            });
        };
        _this.renderAddDialog = function () {
            return (<DepositCreateDialog addDeposit={_this.createDeposit} onClosePress={_this.disableAddDialog}/>);
        };
        _this.destroyDeposit = function (idDeposit, idAccount) {
            ServiceAccount.deleteDeposit(idDeposit, idAccount)
                .then(function (response) {
                ToastAndroid.show("Successfully destroyed the deposit!", ToastAndroid.SHORT);
                _this.getDepositsFromAPI();
                _this.disableDestroyDialog();
            })
                .catch(function (error) {
                alert(error);
            });
        };
        _this.renderDestroyDepositDialog = function () {
            return (<DepositDestroyDialog onDestroyButtonPress={_this.destroyDeposit} onClosePress={_this.disableDestroyDialog} idDeposit={_this.state.chosenDeposit}/>);
        };
        _this.state = {
            destroyDialogIsVisible: false,
            addDialogIsVisible: false,
            deposits: [],
            isLoading: true,
            loggedInUserId: 0,
            chosenDeposit: 0,
        };
        _this.props.navigation.addListener('willFocus', function () {
            _this.getDataFromAsyncStorage();
        });
        return _this;
    }
    DepositsComponent.prototype.render = function () {
        if (this.state.isLoading == false) {
            return (<View style={{ flex: 1 }}>
                    <Dialog width={300} height={300} visible={this.state.addDialogIsVisible} children={this.renderAddDialog()}/>
                    <Dialog width={300} height={200} visible={this.state.destroyDialogIsVisible} children={this.renderDestroyDepositDialog()}/>
                    <ScrollView removeClippedSubviews={true}>



                        {this.renderDeposits()}


                    </ScrollView>
                    <FloatingButton action={this.enableAddDialog}/>
                </View>);
        }
        else {
            return (<View style={styles.loadingViewIndicator}>
                    <ActivityIndicator size={50} color="#3698f0"/>
                </View>);
        }
    };
    return DepositsComponent;
}(Component));
export default DepositsComponent;
//# sourceMappingURL=deposits.component.js.map