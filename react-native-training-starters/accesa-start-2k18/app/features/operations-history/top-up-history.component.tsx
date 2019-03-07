import React, {Component} from 'react'
import {ActivityIndicator, AsyncStorage, ScrollView, View} from "react-native";
import TopUpHistoryCard from "../components/top-up-history-card/top-up-history-card.component";
import ServiceUser, {IGetOperations} from "../../services/ServiceUser";
import {IGetOperation} from "../../services/ServiceAccount";
import styles from "./operation-history.component.style";


interface IState {
    loggedInUserId: number,
    operations: any,
    isLoading: boolean,
}

export default class TopUpHistoryComponent extends Component<any, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            loggedInUserId: 0,
            operations: [],
            isLoading: true,
        };

        this.getDataFromAsyncStorage()
    }

    getDataFromAPI = () => {

        ServiceUser.getTopUpOperations(this.state.loggedInUserId)
            .then((response: IGetOperations) => {
                this.setState({
                    operations: response.data,
                }, () => {
                    this.setState({
                        isLoading: false,
                    })
                })
            })
            .catch(error => {
                alert(this.state.loggedInUserId);
                alert(error);
            })
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
                alert(error);
            })
    };

    renderOneOperation = (operation: IGetOperation, key: any) => {
        return (
            <TopUpHistoryCard
                key={key}
                IBAN={operation.accountDestinationIBAN}
                Date={operation.date.substr(0, 10)}
                Alias={operation.alias}
                Sum={operation.sumToTransfer}/>
        )
    };

    renderTopUpList = () => {

        return this.state.operations.map((currentValue: any, key: any) => {

            return this.renderOneOperation(currentValue, key);
        });


    };

    render() {
        if (this.state.isLoading == false) {
            return (

                <View style={styles.wrapper}>
                    <ScrollView
                        removeClippedSubviews={true}>

                        {this.renderTopUpList()}

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