import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { AsyncStorage, ScrollView, Text, View } from 'react-native';
import { NavigationActions } from 'react-navigation';
import { AppRoutes, AppRouteTitles } from '../app.routes';
import styles from './side-menu.component.styles';
var SideMenuComponent = /** @class */ (function (_super) {
    tslib_1.__extends(SideMenuComponent, _super);
    function SideMenuComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.routesToDisplay = [];
        _this.navigateToScreen = function (routeName) { return function () {
            var navigationAction = NavigationActions.navigate({ routeName: routeName });
            if (routeName == "logout") {
                AsyncStorage.removeItem('id')
                    .then(function (response) {
                    SideMenuComponent.loggedIn = false;
                    _this.props.navigation.dispatch(navigationAction);
                })
                    .catch(function (error) {
                    alert("Ops, an error has occured, please try again!");
                });
            }
            else {
                _this.props.navigation.dispatch(navigationAction);
            }
        }; };
        _this.getNavigationItemClassesFor = function (route) {
            var navigation = _this.props.navigation;
            var lastRoute = navigation.state.routes[0].routes.length - 1;
            var currentScreen = navigation.state.routes[0].routes[lastRoute].routeName;
            if (currentScreen === route) {
                return [styles.activeMenuItem];
            }
            return [];
        };
        _this.renderNavigationItem = function (_a, index) {
            var route = _a.route, key = _a.key;
            var classes = [];
            var labelClasses = [styles.navItemLabel];
            if (index === 0) {
                classes.push(styles.firstDrawerItem);
            }
            if (route === AppRoutes.home) {
                labelClasses.push(styles.home);
            }
            if (route == "view_friends_to_transfer_money" ||
                route == "history" || route == "transfer_money" ||
                route == "group_details" ||
                route == "view_friends_to_add_to_group" ||
                route == "chat" ||
                route == "view_members_of_bill" ||
                route == "view_friends_to_add_to_bill" ||
                route == 'budget_analyzer' ||
                route == 'debts') {
                return null;
            }
            else {
                if (SideMenuComponent.loggedIn == false && (route == 'login' || route == 'register'))
                    return (<View key={key} style={[styles.drawerItem].concat(classes, _this.getNavigationItemClassesFor(route))}>

                        <Text style={labelClasses} onPress={_this.navigateToScreen(route)}>{AppRouteTitles[route]}</Text>

                    </View>);
                else {
                    if (SideMenuComponent.loggedIn == true && route != 'login' && route != 'register')
                        return (<View key={key} style={[styles.drawerItem].concat(classes, _this.getNavigationItemClassesFor(route))}>

                            <Text style={labelClasses} onPress={_this.navigateToScreen(route)}>{AppRouteTitles[route]}</Text>

                        </View>);
                    else
                        return null;
                }
            }
        };
        _this.routesToDisplay = Object.keys(AppRoutes)
            .map(function (value, index) { return ({
            key: index,
            route: value
        }); });
        return _this;
    }
    SideMenuComponent.prototype.render = function () {
        var _this = this;
        return (<View style={styles.container}>
                <ScrollView>
                    <View style={styles.menuHeader}>
                        <Text style={styles.menuHeaderTitle}>Accesa Starter 2k18</Text>
                    </View>
                    {this.routesToDisplay.map(function (route, index) { return _this.renderNavigationItem(route, index); })}
                </ScrollView>
            </View>);
    };
    SideMenuComponent.loggedIn = false;
    return SideMenuComponent;
}(Component));
export default SideMenuComponent;
//# sourceMappingURL=side-menu.component.js.map