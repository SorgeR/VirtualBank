import React, {Component} from 'react'
import {ActivityIndicator, AsyncStorage, ScrollView, ToastAndroid, View} from "react-native";
import ServiceUser, {IDebt, IGetDebtsToPay} from "../../services/ServiceUser";
import PayDebtCard from "../components/pay-debt-card/pay-debt-card.component";
import styles from "./debts.component.style";
import Dialog from "react-native-popup-dialog";
import PayDebtDialog from "../components/pay-debt-dialog/pay-debt-dialog.component";
import ServiceBill from "../../services/ServiceBill";
import {AppRoutes} from "../../app.routes";

interface IState {
    debts: any,
    loggedInUserId: number,
    isLoading: boolean,
    isVisible: boolean,
    destinationAccountId: number,
    sumToPay: number,
    idDebt:number,
    destinationUserId:number,
}

export default class MyDebtsComponent extends Component<any, IState> {


    constructor(props: any) {
        super(props);
        this.state = {
            debts: [],
            loggedInUserId: 0,
            isLoading: true,
            isVisible: false,
            destinationAccountId: 0,
            sumToPay: 0,
            idDebt:0,
            destinationUserId:0,

        };

        this.props.navigation.addListener('willFocus', () => {

            this.getDataFromAsyncStorage()

        })
    }

    getDataFromAsyncStorage = () => {

        AsyncStorage.getItem('id')
            .then((response) => {

                if (response != null) {
                    this.setState({
                        loggedInUserId: Number(response),
                    }, () => {
                        this.getDebtsFromAPI();
                    })
                }
            })
            .catch((error) => {
                alert(error)
            })

    };

    getDebtsFromAPI = () => {
        ServiceUser.getDebtsToPay(this.state.loggedInUserId)
            .then((response: IGetDebtsToPay) => {
                this.setState({
                    debts: response.data,
                }, () => {
                    this.setState({
                        isLoading: false,
                    })
                })
            })
            .catch(error => {
                alert(error);
            })
    };

    renderOneDebt = (debt: IDebt, key: any) => {
        return (
            <PayDebtCard
                key={key}
                billName={debt.billName}
                sumToPay={debt.sumToPay}
                creatorAccountId={debt.creatorAccountId}
                creatorIBAN={debt.creatorIBAN}
                creatorFirstName={debt.creatorFirstName}
                creatorLastName={debt.creatorLastName}
                payDebtFunction={() => {
                    this.setState({
                        destinationAccountId: debt.creatorAccountId,
                        sumToPay: debt.sumToPay,
                        idDebt:debt.idDebt,
                    }, () => {
                        this.enableDialog();
                    })
                }}
                payLaterFunction={()=>{
                    this.setState({
                        destinationUserId:debt.idCreator,
                    },()=>{
                        this.navigateToChat();
                    })
                }}
            />
        )

    };

    renderDebts = () => {
        return this.state.debts.map((currentValue: IDebt, key: any) => {
            return this.renderOneDebt(currentValue, key);
        })
    };

    payDebt = (idDebt:number,sourceAccount: number, destinationAccount: number, sumToPay: number) => {

        ServiceBill.payDebt(idDebt,sourceAccount, destinationAccount, sumToPay)
            .then(response => {
                ToastAndroid.show("Successfully transferred the money!", ToastAndroid.SHORT);
                this.getDebtsFromAPI();
            })
            .catch(error => {
                alert(error)
            })
        this.disableDialog();
    };

    renderPayDebtDialog = () => {

        return (
            <PayDebtDialog
                idDestinationAccount={this.state.destinationAccountId}
                sumToPay={this.state.sumToPay}
                idDebt={this.state.idDebt}
                onPayButtonPress={this.payDebt}
                onClosePress={this.disableDialog}/>
        )

    };

    enableDialog = () => {
        this.setState({
            isVisible: true,
        });
    };

    disableDialog = () => {
        this.setState({
            isVisible: false,
        })
    };

    navigateToChat=()=>{
        this.props.navigation.navigate(AppRoutes.chat,{"friendID":this.state.destinationUserId})
    };

    render() {
        if (this.state.isLoading == false) {
            return (
                <View style={styles.wrapper}>
                    <ScrollView
                        removeClippedSubviews={true}>
                        <Dialog
                            width={300}
                            height={200}
                            visible={this.state.isVisible}
                            children={this.renderPayDebtDialog()}
                        />
                        {this.renderDebts()}
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
    };

}

