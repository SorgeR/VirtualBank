import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { View, Text, Image, ImageBackground, TouchableOpacity, Animated, Easing, AsyncStorage } from 'react-native';
import styles from './home.component.styles';
import { AppRoutes } from "../../app.routes";
import ServiceUser from "../../services/ServiceUser";
var HomeComponent = /** @class */ (function (_super) {
    tslib_1.__extends(HomeComponent, _super);
    function HomeComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.getDataFromAsyncStorage = function () {
            AsyncStorage.getItem('id')
                .then(function (response) {
                if (response != null) {
                    _this.setState({
                        loggedInUserId: Number(response),
                    }, function () {
                        _this.getBudgetFromAPI();
                    });
                }
            })
                .catch(function (error) {
                alert('error');
            });
        };
        _this.getBudgetFromAPI = function () {
            ServiceUser.getTotalBudgetOfUser(_this.state.loggedInUserId)
                .then(function (response) {
                _this.setState({
                    budget: response.budget
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
        _this._animateImage = function () {
            Animated.timing(_this.state.yValue, {
                toValue: 380,
                duration: 1500,
                easing: Easing.bounce
            }).start();
        };
        _this._fadeInButtons = function () {
            Animated.timing(_this.state.buttonsFade, {
                toValue: 1,
                duration: 3000,
            }).start();
        };
        _this.renderBudgetText = function () {
            if (_this.state.isLoading == false) {
                return (<Text style={styles.budgetText}>{_this.state.budget} RON</Text>);
            }
            else {
                return null;
            }
        };
        _this.state = {
            yValue: new Animated.Value(0),
            buttonsFade: new Animated.Value(0),
            loggedInUserId: 0,
            isLoading: true,
            budget: 0,
        };
        _this.props.navigation.addListener('willFocus', function () {
            _this._animateImage();
            _this._fadeInButtons();
            _this.getDataFromAsyncStorage();
        });
        return _this;
    }
    HomeComponent.prototype.render = function () {
        var _this = this;
        return (<View style={styles.container}>
                <View style={styles.topContainer}>
                <Animated.View style={{ height: this.state.yValue }}>
                    <ImageBackground style={styles.imageBackground} source={require("../images/home_background.jpg")}>

                        <View style={styles.budgetTextWrapper}>
                            {this.renderBudgetText()}

                        </View>
                    </ImageBackground>
                </Animated.View>



                </View>


                <View style={styles.bottomContainer}>

                    <View style={styles.bottomButtonsHorizontalWrapper}>

                        <Animated.View style={[styles.buttonWrapper, { opacity: this.state.buttonsFade }]}>
                            <TouchableOpacity onPress={function () {
            _this.props.navigation.navigate(AppRoutes.budget_analyzer);
        }}>
                                <Image source={require("../images/analysis_icon.png")} style={styles.buttonStyle}/>
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View style={[styles.buttonWrapper, { opacity: this.state.buttonsFade }]}>
                            <TouchableOpacity onPress={function () { _this.props.navigation.navigate(AppRoutes.history); }}>
                                <Image source={require("../images/history_icon.png")} style={styles.buttonStyle}/>
                            </TouchableOpacity>
                        </Animated.View>

                        <Animated.View style={[styles.buttonWrapper, { opacity: this.state.buttonsFade }]}>
                            <TouchableOpacity onPress={function () { _this.props.navigation.navigate(AppRoutes.debts); }}>
                                <Image source={require("../images/liability_icon.png")} style={styles.buttonStyle}/>
                            </TouchableOpacity>
                        </Animated.View>
                    </View>
                </View>
            </View>);
    };
    return HomeComponent;
}(Component));
export default HomeComponent;
//# sourceMappingURL=home.component.js.map