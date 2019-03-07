import React, {Component} from 'react';
import {Text, Button, View, ImageBackground, TouchableOpacity, AsyncStorage} from 'react-native';
import {AppRoutes} from '../../app.routes';
import styles from './login.component.styles';
import {IGetUser, LoginResponse} from "../../services/ServiceUser"
import ServiceUser from "../../services/ServiceUser";
import RegexHolder from "../../services/RegexHolder"
import WithValidatorInput from "../components/WithValidatorInput"
import SideMenuComponent from "../../side-menu/side-menu.component";


interface LoginProps {
    navigation: any,

}

interface LoginState {
    phoneNumber: string,
    password: string,
    phoneNumberValid: boolean,
    passwordValid: boolean,
    allValid: boolean,
    id: number,
    user: any,

}

const backgroundImage = require('../images/register_background.png');


export default class LoginComponent extends Component<LoginProps, any> {


    constructor(props: any) {
        super(props);
        this.state = {
            phoneNumber: "",
            password: "",
            phoneNumberValid: false,
            passwordValid: false,
            allValid: false,
        }
        const willFocusSubscription = this.props.navigation.addListener('willFocus', () => {
            this.onAlreadyLoggedIn()
        })
    }

    navigateToHomePage() {

        this.props.navigation.navigate(AppRoutes.home);
    }

    onSuccessfullyLogIn = () => {

        AsyncStorage.setItem('id', this.state.id.toString())
            .then((response) => {
                SideMenuComponent.loggedIn = true;
                this.navigateToHomePage()
            })
            .catch((error) => {

                alert("Ops, an error has occured, please try again!")
            })
    }

    onAlreadyLoggedIn = () => {

        AsyncStorage.getItem('id')
            .then((response) => {

                if (response != null) {
                    SideMenuComponent.loggedIn = true;
                    this.navigateToHomePage();
                }
            })
            .catch((error) => {
                return;
            })

    };

    login = () => {
        const {password, phoneNumber} = this.state;
        ServiceUser.login(phoneNumber, password)
            .then((loginResponse: IGetUser) => {
                this.setState({
                    user: loginResponse,
                }, () => {
                    this.setState({
                        id: this.state.user.id,
                    }, () => {
                        this.onSuccessfullyLogIn()
                    })
                })
            })
            .catch((error) => {
                alert(error);
            })
    }

    validate = (field: string,
                text: string,
                regex: RegExp) => {

        this.setState((prevState: any) => {
            return {
                [field]: text,
                [field + 'Valid']: regex.test(text),

            }
        }, () => {
            this.setState({
                allValid: (this.state.passwordValid && this.state.phoneNumberValid)
            })
        });


    }

    render() {
        const {navigation} = this.props;

        return (

            <View style={{backgroundColor: 'grey', flex: 1}}>

                <ImageBackground
                    source={backgroundImage}
                    style={styles.backgroundImageStyle}
                >
                    <View style={styles.container}>


                        <WithValidatorInput value={this.state.phoneNumber}
                                            valid={this.state.phoneNumberValid}
                                            placeholder={"Phone number"}
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
                                            isPassword={true}
                        />

                        <View style={styles.loginButton}>
                            <Button
                                color="#428FDC"
                                title="Login"
                                onPress={() => {
                                    this.login()
                                }}
                                disabled={!this.state.allValid}
                            />
                        </View>


                        <TouchableOpacity
                            onPress={() => {

                                navigation.navigate(AppRoutes.register)
                            }}
                        >
                            <Text style={styles.registerButton}>Not registered yet?</Text>
                        </TouchableOpacity>

                    </View>


                </ImageBackground>


            </View>

        );
    }
}