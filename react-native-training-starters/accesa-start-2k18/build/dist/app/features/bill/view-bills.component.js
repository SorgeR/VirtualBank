import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, ScrollView, ToastAndroid, View } from "react-native";
import ViewBillCard from "../components/view-bill-card/view-bill-card.component";
import Dialog from "react-native-popup-dialog";
import FloatingButton from "../components/floating-button/floating-button.component";
import NewBillDialog from "../components/new-bill-dialog/new-bill-dialog.component";
import ServiceUser from "../../services/ServiceUser";
import styles from "./view-bill.component.style";
import ServiceBill from "../../services/ServiceBill";
import { SearchBar } from "react-native-elements";
var ViewBillsComponent = /** @class */ (function (_super) {
    tslib_1.__extends(ViewBillsComponent, _super);
    function ViewBillsComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.disableDialog = function () {
            _this.setState({
                isDialogVisible: false,
            });
        };
        _this.enableDialog = function () {
            _this.setState({
                isDialogVisible: true,
            });
        };
        _this.getDataFromAsyncStorage = function () {
            AsyncStorage.getItem('id')
                .then(function (response) {
                if (response != null) {
                    _this.setState({
                        loggedInUserId: Number(response),
                    }, function () {
                        _this.getBillsFromAPI();
                    });
                }
            })
                .catch(function (error) {
                alert('error');
            });
        };
        _this.getBillsFromAPI = function () {
            ServiceUser.getBills(_this.state.loggedInUserId)
                .then(function (response) {
                _this.setState({
                    bills: response.data,
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
        _this.renderOneBill = function (bill, key) {
            if (bill.name.startsWith(_this.state.searchText) || _this.state.searchText == "") {
                return (<ViewBillCard navigation={_this.props.navigation} key={key} billId={bill.id} billTitle={bill.name} billSum={bill.price} billOwnerId={bill.idCreator} billDate={bill.date.substr(0, 10)} billDescription={bill.description}/>);
            }
            else {
                return null;
            }
        };
        _this.renderAllBills = function () {
            return _this.state.bills.map(function (currentValue, key) {
                return _this.renderOneBill(currentValue, key);
            });
        };
        _this.saveBill = function (idOwner, description, billName, account, sum) {
            ServiceBill.createBill(idOwner, account, billName, description, sum)
                .then(function (response) {
                ToastAndroid.show("Successfully payed the bill!", ToastAndroid.SHORT);
                _this.setState({
                    isLoading: true,
                });
                _this.getBillsFromAPI();
            })
                .catch(function (error) {
                alert(error);
            });
        };
        _this.state = {
            isDialogVisible: false,
            loggedInUserId: 0,
            bills: [],
            isLoading: true,
            userName: "",
            searchText: "",
        };
        _this.props.navigation.addListener('willFocus', function () {
            _this.getDataFromAsyncStorage();
        });
        return _this;
    }
    ViewBillsComponent.prototype.render = function () {
        var _this = this;
        if (!this.state.isLoading) {
            return (<View style={styles.wrapper}>
                    <SearchBar platform="android" cancelIcon={{ type: 'font-awesome', name: 'chevron-left' }} placeholder='Search by bill name' onChangeText={function (text) { return _this.setState({
                searchText: text,
            }); }}/>
                    <ScrollView removeClippedSubviews={true}>
                        <Dialog width={320} height={450} visible={this.state.isDialogVisible} children={<NewBillDialog saveBillFunction={this.saveBill} idOwner={this.state.loggedInUserId} onClosePress={this.disableDialog}/>}/>

                        {this.renderAllBills()}


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
    return ViewBillsComponent;
}(Component));
export default ViewBillsComponent;
//# sourceMappingURL=view-bills.component.js.map