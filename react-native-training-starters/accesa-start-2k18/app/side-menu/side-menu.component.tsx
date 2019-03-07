import React, {Component} from 'react';
import {AsyncStorage, ScrollView, Text, View} from 'react-native';
import {NavigationActions} from 'react-navigation';
import {AppRoutes, AppRouteTitles} from '../app.routes';
import styles from './side-menu.component.styles';

interface ISideMenuProps {
    navigation: any

}

export default class SideMenuComponent extends Component<ISideMenuProps, any> {
    private routesToDisplay: any[] = [];
    static loggedIn = false;

    constructor(props: any) {
        super(props);

        this.routesToDisplay = Object.keys(AppRoutes)
            .map((value: any, index: number) => ({
                key: index,
                route: value
            }));

    }


    private navigateToScreen = (routeName: keyof typeof AppRoutes) => () => {
        const navigationAction = NavigationActions.navigate({routeName});


        if (routeName == "logout") {

            AsyncStorage.removeItem('id')
                .then((response) => {
                    SideMenuComponent.loggedIn = false;
                    this.props.navigation.dispatch(navigationAction);
                })
                .catch((error) => {
                    alert("Ops, an error has occured, please try again!")
                })
        }
        else {
            this.props.navigation.dispatch(navigationAction);
        }

    };

    private getNavigationItemClassesFor = (route: keyof typeof AppRoutes) => {
        const {navigation} = this.props;
        const lastRoute = navigation.state.routes[0].routes.length - 1;
        const currentScreen = navigation.state.routes[0].routes[lastRoute].routeName;
        if (currentScreen === route) {
            return [styles.activeMenuItem];
        }
        return [];
    };


    private renderNavigationItem = ({route, key}: { route: keyof typeof AppRoutes, key: number }, index: number) => {
        const classes = [];
        const labelClasses = [styles.navItemLabel];
        if (index === 0) {
            classes.push(styles.firstDrawerItem);
        }
        if (route === AppRoutes.home) {
            labelClasses.push(styles.home);
        }

        if (route=="view_friends_to_transfer_money" ||
            route=="history"|| route=="transfer_money" ||
            route=="group_details" ||
            route=="view_friends_to_add_to_group" ||
            route=="chat" ||
            route=="view_members_of_bill" ||
            route=="view_friends_to_add_to_bill" ||
            route=='budget_analyzer' ||
            route=='debts'
        ) {
            return null
        }
        else {
            if (SideMenuComponent.loggedIn == false && (route == 'login' || route == 'register'))
                return (
                    <View key={key} style={[styles.drawerItem, ...classes, ...this.getNavigationItemClassesFor(route)]}>

                        <Text
                            style={labelClasses}
                            onPress={this.navigateToScreen(route)}>{AppRouteTitles[route]}</Text>

                    </View>
                );
            else {
                if (SideMenuComponent.loggedIn == true && route != 'login' && route != 'register')
                    return (
                        <View key={key}
                              style={[styles.drawerItem, ...classes, ...this.getNavigationItemClassesFor(route)]}>

                            <Text
                                style={labelClasses}
                                onPress={this.navigateToScreen(route)}>{AppRouteTitles[route]}</Text>

                        </View>
                    );
                else return null;
            }

        }
    };

    render() {

        return (
            <View style={styles.container}>
                <ScrollView>
                    <View style={styles.menuHeader}>
                        <Text style={styles.menuHeaderTitle}>Accesa Starter 2k18</Text>
                    </View>
                    {this.routesToDisplay.map((route, index) => this.renderNavigationItem(route, index))}
                </ScrollView>
            </View>
        );

    }
}
