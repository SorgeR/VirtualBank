import * as tslib_1 from "tslib";
import React, { Component } from 'react';
import { Button, View, ImageBackground, ScrollView, ToastAndroid } from 'react-native';
import styles from './register.component.styles';
import { AppRoutes } from "../../app.routes";
import RegexHolder from "../../services/RegexHolder";
import WithValidatorInput from "../components/WithValidatorInput";
import ServiceUser from "../../services/ServiceUser";
var backgroundImage = require('../images/register_background.png');
var RegisterComponent = /** @class */ (function (_super) {
    tslib_1.__extends(RegisterComponent, _super);
    function RegisterComponent(props) {
        var _this = _super.call(this, props) || this;
        _this.register = function () {
            var _a = _this.state, firstName = _a.firstName, lastName = _a.lastName, phoneNumber = _a.phoneNumber, password = _a.password;
            ServiceUser.register(phoneNumber, password, firstName, lastName)
                .then(function (response) {
                _this.successfullyRegistered();
            })
                .catch(function (error) {
                alert(error);
            });
        };
        _this.successfullyRegistered = function () {
            _this.props.navigation.navigate(AppRoutes.login);
            ToastAndroid.show("Successfully registered!", ToastAndroid.SHORT);
        };
        _this.validate = function (field, text, regex) {
            _this.setState(function (prevState) {
                var _a;
                return (_a = {},
                    _a[field] = text,
                    _a[field + 'Valid'] = regex.test(text),
                    _a);
            }, function () {
                _this.setState({
                    allValid: (_this.state.firstNameValid &&
                        _this.state.lastNameValid &&
                        _this.state.passwordValid &&
                        _this.state.confirmPasswordValid &&
                        _this.state.phoneNumberValid)
                });
            });
        };
        //validates the confirm password from state
        _this.validateConfirmPassword = function (field, text, regex) {
            _this.setState(function (prevState) {
                var _a;
                return (_a = {},
                    _a[field] = text,
                    _a[field + 'Valid'] = regex.test(text) && _this.state.password == text,
                    _a);
            }, function () {
                _this.setState({
                    allValid: (_this.state.firstNameValid &&
                        _this.state.lastNameValid &&
                        _this.state.passwordValid &&
                        _this.state.confirmPasswordValid &&
                        _this.state.phoneNumberValid)
                });
            });
        };
        _this.state = {
            firstName: "",
            lastName: "",
            phoneNumber: "",
            password: "",
            confirmPassword: "",
            firstNameValid: false,
            lastNameValid: false,
            phoneNumberValid: false,
            confirmPasswordValid: false,
            passwordValid: false,
        };
        return _this;
    }
    RegisterComponent.prototype.render = function () {
        return (<View style={styles.wrapper}>

                <ImageBackground source={backgroundImage} style={styles.backgroundImageStyle}>
                <View style={{ marginTop: 70 }}>
                    <ScrollView contentContainerStyle={styles.wrapperInput}>


                        <WithValidatorInput value={this.state.firstName} valid={this.state.firstNameValid} placeholder={"First Name"} validate={this.validate} field={"firstName"} regex={RegexHolder.personNameRegex} style={styles.inputTextBox} styleError={styles.inputTextBoxError}/>

                        <WithValidatorInput value={this.state.lastName} valid={this.state.lastNameValid} placeholder={"Last Name"} validate={this.validate} field={"lastName"} regex={RegexHolder.personNameRegex} style={styles.inputTextBox} styleError={styles.inputTextBoxError}/>

                        <WithValidatorInput value={this.state.phoneNumber} valid={this.state.phoneNumberValid} placeholder={"Phone Number"} validate={this.validate} field={"phoneNumber"} regex={RegexHolder.phoneNumberRegex} style={styles.inputTextBox} styleError={styles.inputTextBoxError} keyboardType={'numeric'}/>

                        <WithValidatorInput value={this.state.password} valid={this.state.passwordValid} placeholder={"Password"} validate={this.validate} field={"password"} regex={RegexHolder.passwordRegex} style={styles.inputTextBox} styleError={styles.inputTextBoxError} isPassword={true}/>

                        <WithValidatorInput value={this.state.confirmPassword} valid={this.state.confirmPasswordValid} placeholder={"Confirm password"} validate={this.validateConfirmPassword} field={"confirmPassword"} regex={RegexHolder.passwordRegex} style={styles.inputTextBox} styleError={styles.inputTextBoxError} isPassword={true}/>


                        <View style={styles.registerButton}>
                            <Button color="#428FDC" title="Register" onPress={this.register} disabled={!this.state.allValid}/>
                        </View>
                    </ScrollView>
                </View>
                </ImageBackground>
            </View>);
    };
    return RegisterComponent;
}(Component));
export default RegisterComponent;
//# sourceMappingURL=register.component.js.map