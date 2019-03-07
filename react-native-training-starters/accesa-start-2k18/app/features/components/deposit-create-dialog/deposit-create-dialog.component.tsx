import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, Picker, Text, TextInput, TouchableOpacity, View} from "react-native";
import styles from "./deposit-create-dialog.component.style";
import ServiceUser from "../../../services/ServiceUser";

interface IProps {
    addDeposit: Function,
    onClosePress: Function,
}

interface IState {

    accounts: any,
    idUser: number,
    title: string,
    initialSum: number,
    isLoading: boolean,
    budgetOnChosenAccount: number,
    chosenAccountId: number,
    loggedInUserId: number,
    chosenAccountIBAN: string,
}

export default class DepositCreateDialog extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            accounts: [],
            idUser: 0,
            title: "",
            initialSum: 0,
            isLoading: true,
            budgetOnChosenAccount: 0,
            chosenAccountId: 0,
            loggedInUserId: 0,
            chosenAccountIBAN: "",
        }
        this.getDataFromAsyncStorage();
    }

    handleOnValueChangePicker = (itemValue: any) => {
        if (itemValue != 0) {
            this.setState({
                chosenAccountId: itemValue,
            }, () => {
                this.findIBANOfAccountWithID(this.state.chosenAccountId);
            })
        }
    };

    findIBANOfAccountWithID = (id: number) => {
        let found = this.state.accounts.find((el: any) => el.id == id);


        this.setState({
            budgetOnChosenAccount: found.budget,
            chosenAccountIBAN: found.iban
        })
    };

    getDataFromAsyncStorage = () => {

        AsyncStorage.getItem('id')
            .then((response) => {

                if (response != null) {
                    this.setState({
                        loggedInUserId: Number(response),
                    }, () => {
                        this.loadOwnerAccounts();
                    })
                }
            })
            .catch((error) => {
                alert(error);
            })

    };

    loadOwnerAccounts = () => {

        ServiceUser.getAccounts(this.state.loggedInUserId)
            .then(response => {
                this.setState({
                    accounts: response.data,
                }, () => {
                    this.setState({
                        isLoading: false
                    })
                })
            })
    };

    renderOneAccountPickerItem = (account: any, key: any) => {
        return <Picker.Item key={key} label={account.iban} value={account.id}/>
    };

    addDeposit = () => {
        const {chosenAccountId, loggedInUserId, title, initialSum, budgetOnChosenAccount} = this.state;
        if (chosenAccountId == 0) {
            alert("Please choose an account!")
            return;
        }
        if(initialSum<=0){
            alert("The initial sum must be greater than 0!")
            return;
        }
        if(title==""){
            alert("Please enter a title!");
            return;
        }
        if (initialSum > budgetOnChosenAccount) {
            alert("You do not have enough money on this account!")
            return;
        }


        this.props.addDeposit(chosenAccountId, loggedInUserId, title, initialSum);


    };


    render() {
        if (this.state.isLoading == false) {
            return (
                <View style={styles.wrapper}>
                    <View style={styles.headerView}>
                        <Text style={styles.titleText}>Create Deposit</Text>
                    </View>

                    <View style={styles.middleView}>
                        <TextInput placeholder={"Title"}
                                   onChangeText={(text) => {
                                       this.setState({
                                           title: text,
                                       });
                                   }}
                                   style={styles.textInput}
                                   underlineColorAndroid={'transparent'}
                        />

                        <TextInput
                            style={styles.textInput}
                            keyboardType={'numeric'}
                            placeholder={"Sum to deposit"}
                            onChangeText={(text) => {
                                this.setState({
                                    initialSum: Number(text),
                                })
                            }}
                            underlineColorAndroid={'transparent'}
                        />

                        <Picker
                            mode={'dropdown'}
                            style={styles.pickerStyle}
                            selectedValue={this.state.chosenAccountId}
                            onValueChange={(itemValue) => {
                                this.handleOnValueChangePicker(itemValue)
                            }}>
                            <Picker.Item label="Choose the account..." value='0'/>
                            {this.state.accounts.map((element: any, key: any) => {
                                return this.renderOneAccountPickerItem(element, key)
                            })}

                        </Picker>

                        <Text>Budget of account: {this.state.budgetOnChosenAccount}</Text>


                    </View>


                    <View style={styles.footerView}>
                        <TouchableOpacity style={styles.touchableOpacityLeft}
                                          onPress={() => {
                                              this.addDeposit();
                                          }}>
                            <Text style={styles.buttonTextStyle}>DEPOSIT</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchableOpacityRight}
                                          onPress={() => {
                                              this.props.onClosePress();
                                          }}>
                            <Text style={styles.buttonTextStyle}

                            >CLOSE</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            )
        }
        else {
            return (
                <View style={styles.loadingViewIndicator}>
                    <ActivityIndicator size={50} color="#3698f0"/>
                </View>)
        }
    }
}