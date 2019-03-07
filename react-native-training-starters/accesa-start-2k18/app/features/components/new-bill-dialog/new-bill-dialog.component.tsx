import React, {Component} from 'react'
import {Picker, Text, TextInput, ToastAndroid, TouchableOpacity, View} from "react-native";
import styles from "./new-bill-dialog.component.style";
import ServiceUser from "../../../services/ServiceUser";

interface IProps {
    onClosePress: Function,
    idOwner: number,
    saveBillFunction: Function,
}

interface IState {
    description: string,
    billName: string,
    priceToPay: number,
    accountOnWhichYouPay: number,
    accountOnWhichYouPayIBAN: string,
    sumToPay: number,
    accounts: any,
    isLoading: boolean,
    budgetOnChosenAccount: number,
}


export default class NewBillDialog extends Component<IProps, IState> {


    constructor(props: IProps) {
        super(props);

        this.state = {
            billName: "",
            accountOnWhichYouPay: 0,
            accountOnWhichYouPayIBAN: "",
            description: "",
            sumToPay: 0,
            accounts: [],
            isLoading: true,
            priceToPay: 0,
            budgetOnChosenAccount: 0,
        };

        this.loadOwnerAccounts();
    }

    findIBANOfAccountWithID = (id: number) => {
        var found = this.state.accounts.find((el: any) => el.id == id);


        this.setState({
            budgetOnChosenAccount: found.budget,
            accountOnWhichYouPayIBAN: found.iban,
        })
    }

    saveBill = () => {

        const {idOwner} = this.props;
        const {description, billName, accountOnWhichYouPay, sumToPay} = this.state

        if (this.state.accountOnWhichYouPay == 0) {
            alert("Please choose an account!");
            return;
        }
         if (this.state.budgetOnChosenAccount < sumToPay) {
            alert("You dont have enough money on this account!");
            return;
        }
        if(this.state.description==""){
            alert("Please add a description!");
            return;
        }
        if(this.state.billName==""){
            alert("Please add a bill name!");
            return;
        }

        if(this.state.sumToPay<=0){
            alert("The sum to pay must be greater than 0!")
            return;
        }

            this.props.saveBillFunction(idOwner, description, billName, accountOnWhichYouPay, sumToPay);
            this.props.onClosePress()


    }

    handleOnValueChangePicker = (itemValue: any) => {
        if (itemValue != 0) {
            this.setState({
                accountOnWhichYouPay: itemValue,
            }, () => {
                this.findIBANOfAccountWithID(this.state.accountOnWhichYouPay);
            })
        }
    }

    loadOwnerAccounts = () => {
        ServiceUser.getAccounts(this.props.idOwner)
            .then(response => {
                this.setState({
                    accounts: response.data,
                }, () => {
                    this.setState({
                        isLoading: false
                    })
                })
            })
    }

    renderOneAccountPickerItem = (account: any, key: any) => {
        return <Picker.Item key={key} label={account.iban} value={account.id}/>
    }

    render() {
        if (!this.state.isLoading) {
            return (

                <View style={styles.wrapper}>
                    <View style={styles.headerView}>
                        <Text style={styles.titleText}>Create a new Bill</Text>
                    </View>

                    <View style={styles.middleView}>

                        <TextInput
                            style={styles.sumToPayTextInput}
                            underlineColorAndroid={'white'}
                            placeholder={"Sum to pay"}
                            onChangeText={(text) => {
                                this.setState({
                                    sumToPay: Number(text)
                                })
                            }}
                            keyboardType={'numeric'}
                        />


                        <TextInput
                            style={styles.billNameTextInput}
                            underlineColorAndroid={'white'}
                            onChangeText={(text) => {
                                this.setState({
                                    billName: text,
                                })
                            }}
                            placeholder={"Bill name"}/>


                        <TextInput
                            style={styles.descriptionTextInput}
                            multiline={true}
                            underlineColorAndroid={'white'}
                            onChangeText={(text) => {
                                this.setState({
                                    description: text,
                                })
                            }}
                            numberOfLines={4}
                            placeholder={'Description'}
                        />

                        <Picker
                            mode={'dropdown'}
                            style={styles.pickerStyle}
                            selectedValue={this.state.accountOnWhichYouPay}
                            onValueChange={(itemValue) => {
                                this.handleOnValueChangePicker(itemValue)
                            }}>
                            <Picker.Item label="Paying account..." value='0'/>
                            {this.state.accounts.map((element: any, key: any) => {
                                return this.renderOneAccountPickerItem(element, key)
                            })}

                        </Picker>

                        <Text>Budget on account: {this.state.budgetOnChosenAccount}</Text>


                    </View>


                    <View style={styles.footerView}>
                        <TouchableOpacity style={styles.touchableOpacityLeft}
                                          onPress={() => {
                                              this.saveBill();
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