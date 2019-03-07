import React, {Component} from 'react'
import ServiceUser, {IDebtorOfUser} from "../../services/ServiceUser";
import {ActivityIndicator, AsyncStorage, ScrollView, View} from "react-native";
import ViewPersonalDebtorsCard from "../components/view-personal-debtors-card/view-personal-debtors-card.component";
import {AppRoutes} from "../../app.routes";
import styles from "./debts.component.style";

interface IState {
    loggedInUserID: number,
    isLoading: boolean,
    debtors: any,
}

export default class FriendDebtsComponent extends Component<any, IState> {


    constructor(props: any) {
        super(props);
        this.state = {
            isLoading: true,
            debtors: [],
            loggedInUserID: 0,
        }

                this.getDataFromAsyncStorage();


    }

    getDataFromAsyncStorage = () => {

        AsyncStorage.getItem('id')
            .then((response) => {

                if (response != null) {
                    this.setState({
                        loggedInUserID: Number(response),
                    }, () => {
                        this.getDebtorsOfUserFromAPI();
                    });
                }
            })
            .catch((error) => {
                alert(error);
            })
    };

    getDebtorsOfUserFromAPI = () => {

        ServiceUser.getDebtorsOfUser(this.state.loggedInUserID)
            .then(response => {
                this.setState({
                    debtors: response.data,
                }, () => {
                    this.setState({
                        isLoading: false,
                    })
                });
            })
            .catch(error => {
                alert(error);
            })
    };

    renderOneDebtor = (debtor: IDebtorOfUser, key: any) => {
        return (
            <ViewPersonalDebtorsCard
                key={key}
                billName={debtor.billName}
                sumToPay={debtor.sumToGet}
                debtorFirstName={debtor.debtorFirstName}
                debtorLastName={debtor.debtorLastName}
                messageDebtorFunction={() => {
                    this.props.navigation.navigate(AppRoutes.chat, {"friendID": debtor.debtorId});

                }}/>
        )
    };

    renderDebtors = () => {
        return this.state.debtors.map((currentValue: IDebtorOfUser, key: any) => {
            return this.renderOneDebtor(currentValue, key);
        })
    };


    render() {
        if (this.state.isLoading == false) {
            return (
                <View style={styles.wrapper}>
                    <ScrollView>
                        {this.renderDebtors()}
                    </ScrollView>
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

