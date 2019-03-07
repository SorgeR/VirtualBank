import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import PureChart from 'react-native-pure-chart';
import { AsyncStorage, View, Text, ActivityIndicator } from "react-native";
import { Tab, Tabs } from "native-base";
import ServiceUser from "../../services/ServiceUser";
import LastWeekBudgetAnalyze from "./last-week-budget-analyze.component";
import styles from "../view-group-details/view-group-details.component.style";
import LastMonthBudgetAnalyze from "./last-month-analyze.component";
var BudgetAnalyzeComponent = /** @class */ (function (_super) {
    tslib_1.__extends(BudgetAnalyzeComponent, _super);
    function BudgetAnalyzeComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.getLastWeekData = function () {
            ServiceUser.getUserLastWeekStatistics(_this.state.loggedInUserId)
                .then(function (response) {
                _this.setState({
                    statisticsData: response.data,
                }, function () {
                    _this.translateDataForGraph();
                    _this.setState({
                        isLoading: false,
                        graphIsLoading: false,
                    });
                });
            })
                .catch(function (err) {
                alert(err);
            });
        };
        _this.getLastMonthData = function () {
            ServiceUser.getUserLastMonthStatistics(_this.state.loggedInUserId)
                .then(function (response) {
                _this.setState({
                    statisticsData: response.data,
                }, function () {
                    _this.translateDataForGraph();
                    _this.setState({
                        isLoading: false,
                        graphIsLoading: false,
                    });
                });
            })
                .catch(function (err) {
                alert(err);
            });
        };
        _this.translateOneDate = function (oneDate) {
            return { x: oneDate.date.toString().substr(0, 10), y: oneDate.totalSum };
        };
        _this.translateDataForGraph = function () {
            var data = [];
            _this.state.statisticsData.forEach(function (value, index, arr) {
                data.push(_this.translateOneDate(value));
            });
            return data;
        };
        _this.renderPureChart = function () {
            if (_this.state.graphIsLoading == false) {
                return (<View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ width: '90%', alignItems: 'center', justifyContent: 'center' }}>
                        <PureChart data={_this.translateDataForGraph()} type='line' height={160} gap={50} showEvenNumberXaxisLabel={true} numberOfYAxisGuideLine={0} width={'100%'} customValueRenderer={function (index, point) {
                    return (<Text style={{ textAlign: 'center', fontSize: 10, color: 'green' }}>{point.y}</Text>);
                }}/>
                    </View>
                </View>);
            }
            else {
                return (<View style={styles.loadingViewIndicator}>
                    <ActivityIndicator size={50} color="#3698f0"/>
                </View>);
            }
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
        _this.state = {
            statisticsData: [],
            loggedInUserId: 0,
            isLoading: true,
            graphIsLoading: true,
        };
        _this.getDataFromAsyncStorage();
        return _this;
    }
    BudgetAnalyzeComponent.prototype.render = function () {
        var _this = this;
        if (this.state.isLoading == false) {
            return (<View style={{ flex: 1 }}>

                    {this.renderPureChart()}

                    <View style={{ flex: 1.3 }}>

                        <Tabs initialPage={0} tabBarUnderlineStyle={{ backgroundColor: "#1B87E6" }} onChangeTab={function (index) {
                if (index.i == 0) {
                    _this.setState({
                        graphIsLoading: true,
                    }, function () {
                        _this.getLastWeekData();
                    });
                }
                if (index.i == 1) {
                    _this.setState({
                        graphIsLoading: true,
                    }, function () {
                        _this.getLastMonthData();
                    });
                }
            }}>
                            <Tab heading="Last Week" tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: "#3698f0", }} textStyle={{ color: "#3698f0" }}>
                                <LastWeekBudgetAnalyze />
                            </Tab>
                            <Tab heading="Last Month" tabStyle={{ backgroundColor: 'white' }} activeTabStyle={{ backgroundColor: "#3698f0", }} textStyle={{ color: "#3698f0" }}>
                                <LastMonthBudgetAnalyze />
                            </Tab>


                        </Tabs>
                    </View>
                </View>);
        }
        else {
            return (<View style={styles.loadingViewIndicator}>
                    <ActivityIndicator size={50} color="#3698f0"/>
                </View>);
        }
    };
    return BudgetAnalyzeComponent;
}(Component));
export default BudgetAnalyzeComponent;
//# sourceMappingURL=budget-analyze.component.js.map