import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { Text, Button, View, ImageBackground, TouchableOpacity, AsyncStorage } from 'react-native';
import { AppRoutes } from '../../app.routes';
import styles from './login.component.styles';
import ServiceUser from "../../services/ServiceUser";
import RegexHolder from "../../services/RegexHolder";
import WithValidatorInput from "../components/WithValidatorInput";
import SideMenuComponent from "../../side-menu/side-menu.component";
var backgroundImage = require('../images/register_background.png');
var LoginComponent = /** @class */ (function (_super) {
    tslib_1.__extends(LoginComponent, _super);
    function LoginComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.onSuccessfullyLogIn = function () {
            AsyncStorage.setItem('id', _this.state.id.toString())
                .then(function (response) {
                SideMenuComponent.loggedIn = true;
                _this.navigateToHomePage();
            })
                .catch(function (error) {
                alert("Ops, an error has occured, please try again!");
            });
        };
        _this.onAlreadyLoggedIn = function () {
            AsyncStorage.getItem('id')
                .then(function (response) {
                if (response != null) {
                    SideMenuComponent.loggedIn = true;
                    _this.navigateToHomePage();
                }
            })
                .catch(function (error) {
                return;
            });
        };
        _this.login = function () {
            var _a = _this.state, password = _a.password, phoneNumber = _a.phoneNumber;
            ServiceUser.login(phoneNumber, password)
                .then(function (loginResponse) {
                _this.setState({
                    user: loginResponse,
                }, function () {
                    _this.setState({
                        id: _this.state.user.id,
                    }, function () {
                        _this.onSuccessfullyLogIn();
                    });
                });
            })
                .catch(function (error) {
                alert(error);
            });
        };
        _this.validate = function (field, text, regex) {
            _this.setState(function (prevState) {
                var _a;
                return _a = {},
                    _a[field] = text,
                    _a[field + 'Valid'] = regex.test(text),
                    _a;
            }, function () {
                _this.setState({
                    allValid: (_this.state.passwordValid && _this.state.phoneNumberValid)
                });
            });
        };
        _this.state = {
            phoneNumber: "",
            password: "",
            phoneNumberValid: false,
            passwordValid: false,
            allValid: false,
        };
        var willFocusSubscription = _this.props.navigation.addListener('willFocus', function () {
            _this.onAlreadyLoggedIn();
        });
        return _this;
    }
    LoginComponent.prototype.navigateToHomePage = function () {
        this.props.navigation.navigate(AppRoutes.home);
    };
    LoginComponent.prototype.render = function () {
        var _this = this;
        var navigation = this.props.navigation;
        return (<View style={{ backgroundColor: 'grey', flex: 1 }}>

                <ImageBackground source={backgroundImage} style={styles.backgroundImageStyle}>
                    <View style={styles.container}>


                        <WithValidatorInput value={this.state.phoneNumber} valid={this.state.phoneNumberValid} placeholder={"Phone number"} validate={this.validate} field={"phoneNumber"} regex={RegexHolder.phoneNumberRegex} style={styles.inputTextBox} styleError={styles.inputTextBoxError} keyboardType={'numeric'}/>


                        <WithValidatorInput value={this.state.password} valid={this.state.passwordValid} placeholder={"Password"} validate={this.validate} field={"password"} regex={RegexHolder.passwordRegex} style={styles.inputTextBox} styleError={styles.inputTextBoxError} isPassword={true}/>

                        <View style={styles.loginButton}>
                            <Button color="#428FDC" title="Login" onPress={function () {
            _this.login();
        }} disabled={!this.state.allValid}/>
                        </View>


                        <TouchableOpacity onPress={function () {
            navigation.navigate(AppRoutes.register);
        }}>
                            <Text style={styles.registerButton}>Not registered yet?</Text>
                        </TouchableOpacity>

                    </View>


                </ImageBackground>


            </View>);
    };
    return LoginComponent;
}(Component));
export default LoginComponent;
//# sourceMappingURL=login.component.js.map