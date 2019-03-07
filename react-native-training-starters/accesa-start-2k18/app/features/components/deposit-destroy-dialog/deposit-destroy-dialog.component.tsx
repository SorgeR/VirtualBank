import React, {Component} from 'react';
import {AsyncStorage, Picker, Text, TouchableOpacity, View} from "react-native";
import styles from "./deposit-destroy-dialog.component.style";
import ServiceUser from "../../../services/ServiceUser";
import ServiceAccount from "../../../services/ServiceAccount";

interface IProps {


    onDestroyButtonPress: Function,
    onClosePress: Function,
    idDeposit: number,
}

interface IState {
    loggedInUserId: number,
    budgetOnChosenAccount: number,
    accounts: any,
    chosenAccountId: number,
    chosenAccountIBAN: string,
    isLoading: boolean,

}

export default class DepositDestroyDialog extends Component<IProps, IState> {
    constructor(props: IProps) {
        super(props);

        this.state = {
            loggedInUserId: 0,
            budgetOnChosenAccount: 0,
            accounts: [],
            chosenAccountId: 0,
            chosenAccountIBAN: "",
            isLoading: true,
        };
        this.getDataFromAsyncStorage();
    }

    destroyDeposit = () => {
        this.props.onDestroyButtonPress(this.props.idDeposit,this.state.chosenAccountId);
    };

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
                        <Text style={styles.titleText}>Destroy Deposit</Text>
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
                                            this.destroyDeposit();
                                          }}>
                            <Text style={styles.buttonTextStyle}>DESTROY</Text>
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