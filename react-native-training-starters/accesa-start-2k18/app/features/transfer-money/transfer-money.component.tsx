import React, {Component} from 'react'
import {View, Text, Picker, Button, ActivityIndicator, ToastAndroid} from "react-native";
import ViewFriendsCard from "../components/view-friends-card/view-friends-card.component";
import styles from "./transfer-money.component.style"
import ServiceUser from "../../services/ServiceUser";
import ServiceAccount from "../../services/ServiceAccount";
import RegexHolder from "../../services/RegexHolder";
import WithValidatorInput from "../components/WithValidatorInput";

interface ITransferMoneyComponentState {
    accountID: number,
    userID: number,
    user?: any,
    sourceAccount?: any,
    destinationAccount?: any,
    chosenIBAN: string,
    chosenAccountID: number,
    destinationAccounts?: any,
    isLoading: boolean,
    loadDestinationUserDataFromAPISolved: boolean,
    loadSourceAccountDataFromAPISolved: boolean,
    loadDestinationUserAccountsFromAPISolved: boolean,
    sumToTransfer: number,
    sumToTransferValid: boolean,
    allValid: boolean,
}

interface ITransferMoneyComponentProps {
    navigation: any,
}

interface IUser {
    firstName: string,
    lastName: string,
    phoneNumber: string,
}

interface IAccount {
    id: number,
    iban: string,
    budget: number,
    currency: string,
    alias: string,
}


export default class TransferMoneyComponent extends Component<ITransferMoneyComponentProps, any> {

    constructor(props: ITransferMoneyComponentProps) {
        super(props);
        this.state = {
            accountID: this.props.navigation.getParam("accountID", "default"),
            userID: this.props.navigation.getParam("friendID", "default"),
            isLoading: true,
            chosenIBAN: "",
            loadDestinationUserAccountsFromAPISolved: false,
            loadDestinationUserDataFromAPISolved: false,
            loadSourceAccountDataFromAPISolved: false,
            chosenAccountID: -1,
            sumToTransfer: 0,
            sumToTransferValid: false,
            allValid: false,

        }
        const willFocusSubscription = this.props.navigation.addListener('willFocus', () => {


            this.loadDestinationUserDataFromAPI();
            this.loadDestinationUserAccountsFromAPI();
            this.loadSourceAccountDataFromAPI();
        })

    }

    setOnLoadingState = () => {

        this.setState({
            isLoading: !(this.state.loadSourceAccountDataFromAPISolved &&
                this.state.loadDestinationUserDataFromAPISolved &&
                this.state.loadDestinationUserAccountsFromAPISolved),

        })
    }

    loadDestinationUserDataFromAPI = () => {

        ServiceUser.getUserByID(this.state.userID)
            .then(response => {
                this.setState({
                    user: response,
                }, () => {
                    this.setState({
                        loadDestinationUserDataFromAPISolved: true,
                    }, () => {
                        this.setOnLoadingState()
                    })
                })

            })
            .catch(error => {
                alert("error");

            })
    }

    loadSourceAccountDataFromAPI = () => {

        ServiceAccount.getAccountById(this.state.accountID)
            .then(response => {
                this.setState({
                    sourceAccount: response,
                }, () => {
                    this.setState({
                        loadSourceAccountDataFromAPISolved: true,
                    }, () => {
                        this.setOnLoadingState()
                    })
                })


            })
            .catch(error => {
                alert("error");

            })
    }

    transferMoneyBetweenAccountsInAPI = () => {
        const {accountID, chosenAccountID, sumToTransfer} = this.state;
        if(chosenAccountID==0 || chosenAccountID==-1){
            alert("Please choose an account!");
        }
        else {
            ServiceAccount.transferMoney(accountID, chosenAccountID, sumToTransfer)
                .then(response => {
                    ToastAndroid.show("Successfully transferred the money!", ToastAndroid.SHORT);
                    this.loadSourceAccountDataFromAPI()
                })
                .catch(error => {
                    alert(error)
                })
        }
    }

    loadDestinationUserAccountsFromAPI = () => {

        ServiceUser.getAccounts(this.state.userID)
            .then(response => {
                this.setState({
                    destinationAccounts: response.data,
                }, () => {
                    this.setState({
                        loadDestinationUserAccountsFromAPISolved: true,
                    }, () => {
                        this.setOnLoadingState()
                    })
                })
            })
            .catch(error => {
                alert("error");

            })
    }

    renderDestinationUserPersonalData = (user: IUser) => {
        return (
            <View style={styles.wrapperCardView}>
                <ViewFriendsCard
                    phoneNumber={user.phoneNumber}
                    firstName={user.firstName}
                    lastName={user.lastName}
                    OnPressRightButton={() => {
                    }}
                    RightButtonParameter={null}
                    ImagePath={require("../images/friends_icon.png")}
                    rightButtonColor={"white"}
                />
            </View>
        )
    }

    renderSourceAccountData = (sourceAccount: IAccount) => {
        return (
            <View style={styles.sourceAccountDataWrapper}>
                <Text style={styles.textIBAN}>Source
                    account</Text>
                <Text style={styles.textIBAN}>{sourceAccount.iban}</Text>
                <Text style={styles.textBudget}>Budget {sourceAccount.budget} {sourceAccount.currency} </Text>

            </View>
        )
    }

    renderOneAccountPickerItem = (account: IAccount, key: any) => {
        return <Picker.Item key={key} label={account.iban} value={account.id}/>
    }

    findIBANOfAccountWithID = (id: number) => {
        var found = this.state.destinationAccounts.find((el: IAccount) => el.id == id);
        this.setState({
            chosenIBAN: found.iban,
        })
    }

    handleOnValueChangePicker = (itemValue: any) => {
        if (itemValue != 0) {
            this.setState({
                chosenAccountID: itemValue,
            }, () => {
                this.findIBANOfAccountWithID(this.state.chosenAccountID);
            })
        }
    }

    renderAccountPickerData = () => {
        return (
            <View style={styles.pickerWrapperStyle}>
                <Picker
                    mode={'dropdown'}
                    style={styles.pickerStyle}
                    selectedValue={this.state.chosenAccountID}
                    onValueChange={(itemValue) => {
                        this.handleOnValueChangePicker(itemValue)
                    }}>
                    <Picker.Item label="Select your friend's IBAN..." value='0'/>
                    {this.state.destinationAccounts.map((element: IAccount, key: any) => {
                        return this.renderOneAccountPickerItem(element, key)
                    })}
                </Picker>

            </View>
        )
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
                allValid: (this.state.sumToTransferValid && this.state.sourceAccount.budget >= this.state.sumToTransfer)
            })
        });


    }

    render() {
        if (this.state.isLoading == false) {
            return (

                <View style={styles.wrapper}>

                    <View style={styles.wrapperForPersonalData}>
                        {this.renderDestinationUserPersonalData(this.state.user)}
                    </View>

                    <View style={styles.wrapperForNotPersonalData}>

                        {this.renderSourceAccountData(this.state.sourceAccount)}

                        <View style={styles.horizontalLineStyle}/>

                        <View style={styles.destinationAccountAndActionsWrapperStyle}>
                            <View style={styles.pickerAndDestinationAccountWrapperStyle}>
                                <Text style={styles.textDestinationAccountStyle}>Destination account</Text>
                                {this.renderAccountPickerData()}

                            </View>
                            <View style={styles.horizontalLineStyle}/>
                            <View style={styles.inputCurrencyAndButtonWrapperStyle}>

                                <View style={styles.textInputAndCurrencyWrapperStyle}>


                                    <WithValidatorInput
                                        value={this.state.sumToTransfer == 0 ? "" : this.state.sumToTransfer.toString()}
                                        valid={this.state.sumToTransferValid}
                                        placeholder={"0"}
                                        validate={this.validate}
                                        field={"sumToTransfer"}
                                        regex={RegexHolder.sumRegex}
                                        style={styles.inputTextBox}
                                        styleError={styles.inputTextBoxError}
                                        keyboardType={'numeric'}


                                    />
                                    <Text
                                        style={styles.textCurrencyStyle}>RON</Text>
                                </View>
                                <View style={styles.buttonWrapperStyle}>
                                    <Button onPress={() => {
                                        this.transferMoneyBetweenAccountsInAPI()
                                    }}
                                            disabled={!this.state.allValid}
                                            title={"SEND MONEY"}
                                            color={"#45E177"}
                                    />
                                </View>
                            </View>

                        </View>


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