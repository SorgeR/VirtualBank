import React, {Component} from 'react'
import {ActivityIndicator, AsyncStorage, ScrollView, View, Text, ToastAndroid} from "react-native";
import FloatingButton from "../components/floating-button/floating-button.component";
import Dialog from "react-native-popup-dialog";
import ServiceUser, {IDeposit} from "../../services/ServiceUser";
import DepositCard from "../components/deposit-card/deposit-card.component";
import styles from "../search-friends/SearchFriends.component.style";
import DepositCreateDialog from "../components/deposit-create-dialog/deposit-create-dialog.component";
import ServiceAccount from "../../services/ServiceAccount";
import DepositDestroyDialog from "../components/deposit-destroy-dialog/deposit-destroy-dialog.component";

interface IState {
    destroyDialogIsVisible: boolean,
    addDialogIsVisible: boolean,
    deposits: any,
    isLoading: boolean,
    loggedInUserId: number,
    chosenDeposit: number,

}

export default class DepositsComponent extends Component<any, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            destroyDialogIsVisible: false,
            addDialogIsVisible: false,
            deposits: [],
            isLoading: true,
            loggedInUserId: 0,
            chosenDeposit: 0,

        };
        this.props.navigation.addListener('willFocus', () => {

            this.getDataFromAsyncStorage();
        });
    }


    getDepositsFromAPI = () => {
        ServiceUser.getDepositsOfUser(this.state.loggedInUserId)
            .then(response => {
                this.setState({
                    deposits: response.data,
                }, () => {
                    this.setState({
                        isLoading: false,
                    })
                });
            })
    };

    getDataFromAsyncStorage = () => {

        AsyncStorage.getItem('id')
            .then((response) => {

                if (response != null) {
                    this.setState({
                        loggedInUserId: Number(response),
                    }, () => {
                        this.getDepositsFromAPI();
                    })
                }
            })
            .catch((error) => {
                alert(error);
            })

    };

    enableDestroyDialog = () => {
        this.setState({
            destroyDialogIsVisible: true,
        });
    };

    disableDestroyDialog = () => {
        this.setState({
            destroyDialogIsVisible: false,
        });
    };

    renderOneDeposit = (deposit: IDeposit, key: any) => {

        return (
            <DepositCard
                key={key}
                title={deposit.title}
                sumToGet={deposit.initialSum}
                date={deposit.createDate.toString().substr(0, 10)}
                enableDialog={() => {
                    this.setState({
                        chosenDeposit: deposit.id,
                    }, () => {

                        this.enableDestroyDialog();
                    });

                }}/>
        )
    };


    renderDeposits = () => {

        return this.state.deposits.map((currentValue: IDeposit, key: any) => {
            return this.renderOneDeposit(currentValue, key);
        })
    };

    enableAddDialog = () => {
        this.setState({
            addDialogIsVisible: true,
        })
    };

    disableAddDialog = () => {
        this.setState({
            addDialogIsVisible: false,
        })
    };

    createDeposit = (idAccount: number, idUser: number, title: string, initialSum: number) => {
        ServiceAccount.createDeposit(idAccount, idUser, title, initialSum)
            .then(response => {
                ToastAndroid.show("Successfully created a new deposit!", ToastAndroid.SHORT);
                this.disableAddDialog();
                this.getDepositsFromAPI();
            })
            .catch(error=>{
                alert(error);
            })
    };

    renderAddDialog = () => {
        return (
            <DepositCreateDialog
                addDeposit={this.createDeposit}
                onClosePress={this.disableAddDialog}/>
        )
    };

    destroyDeposit = (idDeposit: number, idAccount: number) => {
        ServiceAccount.deleteDeposit(idDeposit, idAccount)
            .then(response => {
                ToastAndroid.show("Successfully destroyed the deposit!", ToastAndroid.SHORT);
                this.getDepositsFromAPI();
                this.disableDestroyDialog();
            })
            .catch(error => {
                alert(error)
            });
    };

    renderDestroyDepositDialog = () => {

        return (
            <DepositDestroyDialog
                onDestroyButtonPress={this.destroyDeposit}
                onClosePress={this.disableDestroyDialog}
                idDeposit={this.state.chosenDeposit}/>
        )
    };

    render() {

        if (this.state.isLoading == false) {
            return (
                <View style={{flex: 1}}>
                    <Dialog
                        width={300}
                        height={300}
                        visible={this.state.addDialogIsVisible}
                        children={this.renderAddDialog()}
                    />
                    <Dialog
                        width={300}
                        height={200}
                        visible={this.state.destroyDialogIsVisible}
                        children={this.renderDestroyDepositDialog()}
                    />
                    <ScrollView removeClippedSubviews={true}>



                        {this.renderDeposits()}


                    </ScrollView>
                    <FloatingButton action={this.enableAddDialog}/>
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