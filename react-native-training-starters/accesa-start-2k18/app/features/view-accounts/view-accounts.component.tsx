import React, {Component} from "react";
import {ActivityIndicator, AsyncStorage, Button,Text, ScrollView, ToastAndroid, TouchableOpacity, View} from "react-native";
import ViewAccountsCard from "../components/view-account-card/view-account-card.component";
import Dialog from "react-native-popup-dialog"
import ServiceAccount, {IGetAccountsOfUser} from "../../services/ServiceAccount";
import NewAccountDialog from "../components/new-account-dialog/new-account-dialog.component";
import styles from "./view-accounts.component.style"
import ServiceUser from "../../services/ServiceUser";
import FloatingButton from "../components/floating-button/floating-button.component";

interface IAccount {
    id: number,
    iban: string,
    budget: number,
    currency: string,
    alias: string,
}

interface ViewAccountsToTopupComponentState {

    isVisible: boolean,
    loggedInUserId: number,
    accounts?: any,
    isLoading: boolean,
    searchText: string,
}

export default class ViewAccountsComponent extends Component<any, ViewAccountsToTopupComponentState> {

    constructor(props: any) {
        super(props);
        this.state = {
            isVisible: false,
            loggedInUserId: -1,
            isLoading: true,
            searchText: "",
        }


        const willFocusSubscription = this.props.navigation.addListener('willFocus', () => {

            this.getDataFromAsyncStorage()

        })

    }

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
                    ImagePath={require("../images/delete_friend.png")}
                    OnPressRightButton={() => {
                        this.onPressRightTopUpButton(account)
                    }}
                    RightButtonColor={"white"}
                    RightButtonImageHeight={"40%"}
                    RightButtonImageWidth={"40%"}
                />

            )
        }
        return null;
    }

    deleteAccountInAPI(accountID: number) {
        ServiceAccount.deleteAccountById(accountID)
            .then(response => {
                ToastAndroid.show("Successfully deleted account!", ToastAndroid.SHORT);
                this.getDataFromAPI();
            })
            .catch(error => {
                alert(error);
            })

    }

    onPressRightTopUpButton = (account: IAccount) => {

        this.deleteAccountInAPI(account.id)

    };


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
                alert('error');
            })

    };


    renderAccountsList = () => {

        return this.state.accounts.map((currentValue: any, key: any) => {

            return this.renderAccountItem(currentValue, key);
        });

    };


    disableDialog = () => {
        this.setState({
            isVisible: false,
        })

    };

    enableDialog = () => {
        this.setState({
            isVisible: true,
        })

    };


    addAccountInAPI(idOwner: number, currency: string, alias: string) {
        if (alias != "" && currency != "0") {
            ServiceAccount.createAccount(idOwner, currency, alias)
                .then(response => {
                    ToastAndroid.show("Successfully created a new account!", ToastAndroid.SHORT);
                    this.getDataFromAPI();
                    this.disableDialog();
                })
                .catch(error => {
                    alert(error);
                })
        }
        else {
            alert("Please complete the fields!")
        }

    }

    onDialogAddAccountPress = (idOwner: number, currency: string, alias: string) => {
        this.addAccountInAPI(idOwner, currency, alias);

    };

    renderTopUpDialog() {

        return (

            <NewAccountDialog idOwner={this.state.loggedInUserId}
                              actionOnCancelPress={this.disableDialog}
                              actionOnAddPress={this.onDialogAddAccountPress}/>

        )
    };

    render() {
        if (this.state.isLoading == false) {
            return (
                <View style={{flex: 1}}>
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

                <FloatingButton action={this.enableDialog}/>
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