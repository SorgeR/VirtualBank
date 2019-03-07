import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, ScrollView, View } from "react-native";
import TransferHistoryCard from "../components/transfer-history-card/transfer-history-card.component";
import ServiceUser from "../../services/ServiceUser";
import styles from "./operation-history.component.style";
var TransferHistoryComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TransferHistoryComponent, _super);
    function TransferHistoryComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.getDataFromAPI = function () {
            ServiceUser.getTransferOperations(_this.state.loggedInUserId)
                .then(function (response) {
                _this.setState({
                    operations: response.data,
                }, function () {
                    _this.setState({
                        isLoading: false,
                    });
                });
            })
                .catch(function (error) {
                alert(_this.state.loggedInUserId);
                alert(error);
            });
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
                alert(error);
            });
        };
        _this.renderOneOperation = function (operation, key) {
            if (operation.sourceUserId == _this.state.loggedInUserId) {
                return (<TransferHistoryCard key={key} sourceIBAN={operation.accountSourceIBAN} destinationIBAN={operation.accountDestinationIBAN} date={operation.date.substr(0, 10)} sum={operation.sumToTransfer} colorOfCard={"#FFADAD"} imagePath={require("../images/down_transfer_history.png")}/>);
            }
            else {
                return (<TransferHistoryCard key={key} sourceIBAN={operation.accountDestinationIBAN} destinationIBAN={operation.accountSourceIBAN} date={operation.date.substr(0, 10)} sum={operation.sumToTransfer} colorOfCard={"#E0F8EC"} imagePath={require("../images/top_transfer_history.png")}/>);
            }
        };
        _this.renderTransferList = function () {
            return _this.state.operations.map(function (currentValue, key) {
                return _this.renderOneOperation(currentValue, key);
            });
        };
        _this.state = {
            loggedInUserId: 0,
            operations: [],
            isLoading: true,
        };
        _this.props.navigation.addListener('willFocus', function () {
            _this.getDataFromAsyncStorage();
        });
        return _this;
    }
    ;
    TransferHistoryComponent.prototype.render = function () {
        if (this.state.isLoading == false) {
            return (<View style={styles.wrapper}>
                    <ScrollView removeClippedSubviews={true}>
                        {this.renderTransferList()}


                    </ScrollView>
                </View>);
        }
        else {
            return (<View style={styles.loadingViewIndicator}>
                    <ActivityIndicator size={50} color="#3698f0"/>
                </View>);
        }
    };
    return TransferHistoryComponent;
}(Component));
export default TransferHistoryComponent;
//# sourceMappingURL=transfer-history.component.js.map