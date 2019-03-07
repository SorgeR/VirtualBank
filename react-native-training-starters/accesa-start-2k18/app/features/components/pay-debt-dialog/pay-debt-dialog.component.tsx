import React, {Component} from 'react';
import {AsyncStorage, Picker, Text, TouchableOpacity, View} from "react-native";
import styles from "./pay-debt-dialog.component.style";
import ServiceUser from "../../../services/ServiceUser";

interface IProps {
    idDestinationAccount: number,
    sumToPay: number,
    onPayButtonPress: Function,
    onClosePress: Function,
    idDebt: number,
}

interface IState {
    loggedInUserId: number,
    budgetOnChosenAccount: number,
    accounts: any,
    chosenAccountId: number,
    chosenAccountIBAN: string,
    isLoading: boolean,

}

export default class PayDebtDialog extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            loggedInUserId: 0,
            budgetOnChosenAccount: 0,
            accounts: [],
            chosenAccountId: 0,
            chosenAccountIBAN: "",
            isLoading: true,
        }
        this.getDataFromAsyncStorage();
    }

    findIBANOfAccountWithID = (id: number) => {
        let found = this.state.accounts.find((el: any) => el.id == id);


        this.setState({
            budgetOnChosenAccount: found.budget,
            chosenAccountIBAN: found.iban
        })
    };

    handleOnValueChangePicker = (itemValue: any) => {
        if (itemValue != 0) {
            this.setState({
                chosenAccountId: itemValue,
            }, () => {
                this.findIBANOfAccountWithID(this.state.chosenAccountId);
            })
        }
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


    payDebt = () => {
        const {chosenAccountId} = this.state;
        const {idDestinationAccount, sumToPay, idDebt} = this.props;
        if (chosenAccountId == 0 || chosenAccountId == -1) {
            alert("Please choose an account!");
            return;
        }
        if (this.state.budgetOnChosenAccount < sumToPay) {
            alert("You do not have enough money on this account!");
            return;
        }

        this.props.onPayButtonPress(idDebt, chosenAccountId, idDestinationAccount, sumToPay);

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


    render() {
        if (this.state.isLoading == false) {
            return (

                <View style={styles.wrapper}>
                    <View style={styles.headerView}>
                        <Text style={styles.titleText}>Pay Debt</Text>
                    </View>

                    <View style={styles.middleView}>

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
                                              this.payDebt();
                                          }}>
                            <Text style={styles.buttonTextStyle}>PAY</Text>
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
            return null;
        }
    }
}