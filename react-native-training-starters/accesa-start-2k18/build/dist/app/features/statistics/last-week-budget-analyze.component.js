import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, ScrollView, View } from "react-native";
import ServiceUser from "../../services/ServiceUser";
import StatisticsBudgetCard from "../components/statistics-budget-card/statistics-budget-card.component";
import styles from "../view-group-details/view-group-details.component.style";
var LastWeekBudgetAnalyze = /** @class */ (function (_super) {
    tslib_1.__extends(LastWeekBudgetAnalyze, _super);
    function LastWeekBudgetAnalyze(props) {
        var _this = _super.call(this, props) || this;
        _this.getLastWeekData = function () {
            ServiceUser.getUserLastWeekStatistics(_this.state.loggedInUserId)
                .then(function (response) {
                _this.setState({
                    statisticsData: response.data,
                }, function () {
                    _this.setState({
                        isLoading: false,
                    });
                });
            })
                .catch(function (err) {
                alert(err);
            });
        };
        _this.getDataFromAsyncStorage = function () {
            AsyncStorage.getItem('id')
                .then(function (response) {
                if (response != null) {
                    _this.setState({
                        loggedInUserId: Number(response),
                    }, function () {
                        _this.getLastWeekData();
                    });
                }
            })
                .catch(function (error) {
                alert(error);
            });
        };
        _this.renderOneStatisticsItem = function (item, key) {
            return (<StatisticsBudgetCard key={key} budget={item.totalSum} date={item.date.toString().substr(0, 10)}/>);
        };
        _this.renderAllStatisticsItems = function () {
            return _this.state.statisticsData.map(function (currentValue, key) {
                return _this.renderOneStatisticsItem(currentValue, key);
            }).reverse();
        };
        _this.state = {
            loggedInUserId: 0,
            isLoading: true,
            statisticsData: [],
        };
        _this.getDataFromAsyncStorage();
        return _this;
    }
    LastWeekBudgetAnalyze.prototype.render = function () {
        if (this.state.isLoading == false) {
            return (<View style={{ flex: 1 }}>
                    <ScrollView>
                        {this.renderAllStatisticsItems()}
                    </ScrollView>
                </View>);
        }
        else {
            return (<View style={styles.loadingViewIndicator}>
                    <ActivityIndicator size={50} color="#3698f0"/>
                </View>);
        }
    };
    return LastWeekBudgetAnalyze;
}(Component));
export default LastWeekBudgetAnalyze;
//# sourceMappingURL=last-week-budget-analyze.component.js.map