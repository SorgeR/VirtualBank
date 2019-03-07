import React, {Component} from "react";
import {ActivityIndicator, AsyncStorage, ScrollView, ToastAndroid, View} from "react-native";
import ViewAccountsCard from "../components/view-account-card/view-account-card.component";
import Dialog from "react-native-popup-dialog"
import TopUpDialog from "../components/top-up-dialog/top-up-dialog.component"
import ServiceAccount, {IGetAccountsOfUser} from "../../services/ServiceAccount";
import styles from "./view-accounts-to-topup.component.style";
import RegexHolder from "../../services/RegexHolder";
import ServiceUser from "../../services/ServiceUser";


interface IAccount {
    id: number,
    iban: string,
    budget: number,
    currency: string,
    alias: string,
}

interface ViewAccountsToTopupComponentState {
    chosenId: number,
    chosenIBAN: string,
    chosenAlias: string,
    chosenCurrency: string,
    isVisible: boolean,
    loggedInUserId: number,
    accounts?: any,
    isLoading: boolean,
    searchText: string,
    sumToTransfer: number,
    chosenBudget: number,
}

export default class ViewAccountsToTopupComponent extends Component<any, ViewAccountsToTopupComponentState> {

    constructor(props: any) {
        super(props);
        this.state = {
            isVisible: false,
            chosenId: -1,
            chosenIBAN: "",
            chosenAlias: "",
            chosenCurrency: "",
            loggedInUserId: -1,
            isLoading: true,
            searchText: "",
            sumToTransfer: 0,
            chosenBudget: 0,
        };


        const willFocusSubscription = this.props.navigation.addListener('willFocus', () => {

            this.getDataFromAsyncStorage()

        })

    }

    validSum = (sum: number) => {
        var valid = RegexHolder.sumRegex.test(sum.toString());
        return valid;
    };

    getDataFromAPI = () => {
        ServiceUser.getAccounts(this.state.loggedInUserId)
            .then((response: IGetAccountsOfUser) => {

                this.setState({
                    accounts: response.data,
                }, () => {
                    this.setState({
                        isLoading: false,
                    })
                })

            })
            .catch((error) => {
                alert("error")
            })
    }

    onPressRightTopUpButton = (account: IAccount) => {
        this.setState({
            chosenId: account.id,
            chosenIBAN: account.iban,
            chosenAlias: account.alias,
            chosenCurrency: account.currency,
            chosenBudget: account.budget
        }, () => {
            this.enableDialog();
        })
    }

    renderAccountItem = (account: IAccount, key: any) => {
        const {searchText} = this.state

        if (account.alias.startsWith(searchText) || searchText == "") {
            return (
                <ViewAccountsCard
                    key={key}
                    IBAN={account.iban}
                    Budget={account.budget}
                    Alias={account.alias}
                    Currency={account.currency}
                    ImagePath={require("../images/save_money_image3.png")}
                    OnPressRightButton={() => {
                        this.onPressRightTopUpButton(account)
                    }}
                    RightButtonImageHeight={'70%'}
                    RightButtonImageWidth={"70%"}
                    RightButtonColor={"#45E177"}
                />

            )
        }
        return null;
    }

    getDataFromAsyncStorage = () => {

        AsyncStorage.getItem('id')
            .then((response) => {

                if (response != null) {
                    this.setState({
                        loggedInUserId: Number(response),
                    }, () => {
                        this.getDataFromAPI();
                    })
                }
            })
            .catch((error) => {
                alert('error')
            })

    }


    renderAccountsList = () => {

        var list = this.state.accounts.map((currentValue: any, key: any) => {

            return this.renderAccountItem(currentValue, key);
        })

        return list;

    }


    disableDialog = () => {
        this.setState({
            isVisible: false,
        })

    }

    enableDialog = () => {
        this.setState({
            isVisible: true,
        })

    }

    topUpMoneyInAPI = (accountId: number, sumToTransfer: number) => {
        if (this.validSum(sumToTransfer)) {
            ServiceAccount.topUpAccount(accountId, sumToTransfer)
                .then(response => {
                    ToastAndroid.show("Successfully deposited money!", ToastAndroid.SHORT);
                    this.getDataFromAPI();
                    this.disableDialog();
                })
                .catch(error => {
                    alert(error);
                })
        }
        else {
            alert("The sum is not valid!");
        }
    }

    addTopUp = (accountId: number, sumToTransfer: number) => {
        this.topUpMoneyInAPI(accountId, sumToTransfer);

    }

    renderTopUpDialog() {
        const {chosenBudget, chosenId, chosenIBAN, chosenCurrency, chosenAlias} = this.state;
        return (<TopUpDialog IBAN={chosenIBAN}
                             alias={chosenAlias}
                             currency={chosenCurrency}
                             actionOnCancelPress={this.disableDialog}
                             actionOnAddPress={this.addTopUp}
                             idAccount={chosenId}
                             budget={chosenBudget}
        />)
    }

    render() {
        if (this.state.isLoading == false) {
            return (

                <ScrollView
                    removeClippedSubviews={true}>

                    <Dialog
                        width={300}
                        height={300}
                        visible={this.state.isVisible}
                        children={this.renderTopUpDialog()}
                    />

                    {this.renderAccountsList()}


                </ScrollView>
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