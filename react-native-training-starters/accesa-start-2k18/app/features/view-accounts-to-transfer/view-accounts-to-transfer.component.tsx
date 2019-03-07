import React, {Component} from "react";
import {ActivityIndicator, AsyncStorage, ScrollView, View} from "react-native";
import ViewAccountsCard from "../components/view-account-card/view-account-card.component";
import {AppRoutes} from "../../app.routes";
import {IGetAccountsOfUser} from "../../services/ServiceAccount";
import styles from "./view-accounts-to-transfer.component.style"
import ServiceUser from "../../services/ServiceUser";

interface IViewAccountsToTransferComponentProps {
    navigation: any,
}

interface IViewAccountsToTransferComponentState {
    accounts: any,
    searchText: string,
    isLoading: boolean,
    loggedInUserId: number,
}

interface IAccount {
    id: number,
    iban: string,
    budget: number,
    currency: string,
    alias: string,
}

export default class ViewAccountsToTransferComponent extends Component<IViewAccountsToTransferComponentProps, IViewAccountsToTransferComponentState> {

    constructor(props: IViewAccountsToTransferComponentProps) {
        super(props);
        this.state = {
            accounts: [],
            searchText: "",
            isLoading: true,
            loggedInUserId: -1,
        }

        const willFocusSubscription = this.props.navigation.addListener('willFocus', () => {

            this.getDataFromAsyncStorage()

        })
    }

    navigateToViewFriendsToTransfer = (accountId: number) => {

        this.props.navigation.navigate(AppRoutes.view_friends_to_transfer_money, {"accountID": accountId});

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

    onTransferButtonPress = (accountId: number) => {

        this.navigateToViewFriendsToTransfer(accountId);

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
                    ImagePath={require("../images/transfer_money_image.png")}
                    OnPressRightButton={this.onTransferButtonPress}
                    RightButtonParameter={account.id}
                    RightButtonImageHeight={'70%'}
                    RightButtonImageWidth={"70%"}
                    RightButtonColor={"#45E177"}
                />
            )
        }
        return null;
    }

    renderAccountsList = () => {

        var list = this.state.accounts.map((currentValue: any, key: any) => {

            return this.renderAccountItem(currentValue, key);
        })

        return list;

    }

    render() {
        if (this.state.isLoading == false) {
            return (

                <ScrollView
                    removeClippedSubviews={true}
                >

                    {this.renderAccountsList()}

                </ScrollView>
            )
        }
        return (
            <View style={styles.loadingViewIndicator}>
                <ActivityIndicator size={50} color="#3698f0"/>
            </View>)
    }
}