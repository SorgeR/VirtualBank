import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, ScrollView, View } from "react-native";
import TopUpHistoryCard from "../components/top-up-history-card/top-up-history-card.component";
import ServiceUser from "../../services/ServiceUser";
import styles from "./operation-history.component.style";
var TopUpHistoryComponent = /** @class */ (function (_super) {
    tslib_1.__extends(TopUpHistoryComponent, _super);
    function TopUpHistoryComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.getDataFromAPI = function () {
            ServiceUser.getTopUpOperations(_this.state.loggedInUserId)
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
            return (<TopUpHistoryCard key={key} IBAN={operation.accountDestinationIBAN} Date={operation.date.substr(0, 10)} Alias={operation.alias} Sum={operation.sumToTransfer}/>);
        };
        _this.renderTopUpList = function () {
            return _this.state.operations.map(function (currentValue, key) {
                return _this.renderOneOperation(currentValue, key);
            });
        };
        _this.state = {
            loggedInUserId: 0,
            operations: [],
            isLoading: true,
        };
        _this.getDataFromAsyncStorage();
        return _this;
    }
    TopUpHistoryComponent.prototype.render = function () {
        if (this.state.isLoading == false) {
            return (<View style={styles.wrapper}>
                    <ScrollView removeClippedSubviews={true}>

                        {this.renderTopUpList()}

                    </ScrollView>
                </View>);
        }
        else {
            return (<View style={styles.loadingViewIndicator}>
                    <ActivityIndicator size={50} color="#3698f0"/>
                </View>);
        }
    };
    return TopUpHistoryComponent;
}(Component));
export default TopUpHistoryComponent;
//# sourceMappingURL=top-up-history.component.js.map