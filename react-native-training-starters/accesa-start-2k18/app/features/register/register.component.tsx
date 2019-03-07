import React, {Component} from 'react';
import {Button, View, TextInput, ImageBackground, ScrollView, ToastAndroid} from 'react-native';
import styles from './register.component.styles';
import {AppRoutes} from "../../app.routes";
import RegexHolder from "../../services/RegexHolder"
import WithValidatorInput from "../components/WithValidatorInput";
import ServiceUser, {RegisterResponse} from "../../services/ServiceUser";

const backgroundImage = require('../images/register_background.png');

interface RegisterState {
    firstName: string,
    lastName: string,
    phoneNumber: string,
    password: string,
    confirmPassword: string,
}

interface RegisterProps {
    navigation?: any,
}


export default class RegisterComponent extends Component<RegisterProps, any> {

    constructor(props: any) {
        super(props);
        this.state = {
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

        }
    }


    private register = () => {
        const {firstName, lastName, phoneNumber, password} = this.state;

        ServiceUser.register(phoneNumber, password,  firstName, lastName)
            .then((response: RegisterResponse) => {
                this.successfullyRegistered();
            })
            .catch((error) => {
                alert(error)
            })
    }


    private successfullyRegistered = () => {

        this.props.navigation.navigate(AppRoutes.login);
        ToastAndroid.show("Successfully registered!", ToastAndroid.SHORT);
    }

    validate = (field: string,
                text: string,
                regex: RegExp) => {

        this.setState((prevState: any) => {

            return ({
                [field]: text,
                [field + 'Valid']: regex.test(text),
            })

        }, () => {
            this.setState({
                allValid: (this.state.firstNameValid &&
                    this.state.lastNameValid &&
                    this.state.passwordValid &&
                    this.state.confirmPasswordValid &&
                    this.state.phoneNumberValid)
            })
        });

    }

    //validates the confirm password from state
    validateConfirmPassword = (field: string,
                               text: string,
                               regex: RegExp) => {

        this.setState((prevState: any) => {

            return ({
                [field]: text,
                [field + 'Valid']: regex.test(text) && this.state.password == text,
            })

        }, () => {
            this.setState({
                allValid: (this.state.firstNameValid &&
                    this.state.lastNameValid &&
                    this.state.passwordValid &&
                    this.state.confirmPasswordValid &&
                    this.state.phoneNumberValid)
            })
        });

    }

    render() {
        return (


            <View style={styles.wrapper}>

                <ImageBackground source={backgroundImage}
                                 style={styles.backgroundImageStyle}>
                <View style={{marginTop:70}}>
                    <ScrollView contentContainerStyle={styles.wrapperInput}>


                        <WithValidatorInput value={this.state.firstName}
                                            valid={this.state.firstNameValid}
                                            placeholder={"First Name"}
                                            validate={this.validate}
                                            field={"firstName"}
                                            regex={RegexHolder.personNameRegex}
                                            style={styles.inputTextBox}
                                            styleError={styles.inputTextBoxError}/>

                        <WithValidatorInput value={this.state.lastName}
                                            valid={this.state.lastNameValid}
                                            placeholder={"Last Name"}
                                            validate={this.validate}
                                            field={"lastName"}
                                            regex={RegexHolder.personNameRegex}
                                            style={styles.inputTextBox}
                                            styleError={styles.inputTextBoxError}/>

                        <WithValidatorInput value={this.state.phoneNumber}
                                            valid={this.state.phoneNumberValid}
                                            placeholder={"Phone Number"}
                                            validate={this.validate}
                                            field={"phoneNumber"}
                                            regex={RegexHolder.phoneNumberRegex}
                                            style={styles.inputTextBox}
                                            styleError={styles.inputTextBoxError}
                                            keyboardType={'numeric'}/>

                        <WithValidatorInput value={this.state.password}
                                            valid={this.state.passwordValid}
                                            placeholder={"Password"}
                                            validate={this.validate}
                                            field={"password"}
                                            regex={RegexHolder.passwordRegex}
                                            style={styles.inputTextBox}
                                            styleError={styles.inputTextBoxError}
                                            isPassword={true}/>

                        <WithValidatorInput value={this.state.confirmPassword}
                                            valid={this.state.confirmPasswordValid}
                                            placeholder={"Confirm password"}
                                            validate={this.validateConfirmPassword}
                                            field={"confirmPassword"}
                                            regex={RegexHolder.passwordRegex}
                                            style={styles.inputTextBox}
                                            styleError={styles.inputTextBoxError}
                                            isPassword={true}/>


                        <View style={styles.registerButton}>
                            <Button color="#428FDC"
                                    title="Register"
                                    onPress={
                                        this.register
                                    }
                                    disabled={!this.state.allValid}
                            />
                        </View>
                    </ScrollView>
                </View>
                </ImageBackground>
            </View>


        );
    }
}