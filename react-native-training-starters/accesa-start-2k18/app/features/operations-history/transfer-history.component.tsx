
import React, {Component} from 'react';
import {ActivityIndicator, AsyncStorage, ScrollView, View} from "react-native";
import TransferHistoryCard from "../components/transfer-history-card/transfer-history-card.component";
import ServiceUser, {IGetOperations, IGetTransferOperation} from "../../services/ServiceUser";
import styles from "./operation-history.component.style";

interface IState{
    loggedInUserId:number,
    operations:any,
    isLoading:boolean
}

export default class TransferHistoryComponent extends Component<any, IState> {

    constructor(props: any) {
        super(props);

        this.state={
            loggedInUserId:0,
            operations:[],
            isLoading:true,
        };

        this.props.navigation.addListener('willFocus', () => {

            this.getDataFromAsyncStorage();

        });

    };

    getDataFromAPI=()=>{

        ServiceUser.getTransferOperations(this.state.loggedInUserId)
            .then((response:IGetOperations)=>{
                this.setState({
                    operations:response.data,
                },()=>{
                    this.setState({
                        isLoading:false,
                    });
                })
            })
            .catch(error=>{
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


    renderOneOperation=(operation:IGetTransferOperation,key:any)=> {

        if (operation.sourceUserId== this.state.loggedInUserId)
        {   return (
                <TransferHistoryCard
                    key={key}
                    sourceIBAN={operation.accountSourceIBAN}
                    destinationIBAN={operation.accountDestinationIBAN}
                    date={operation.date.substr(0, 10)}
                    sum={operation.sumToTransfer}
                    colorOfCard={"#FFADAD"}
                    imagePath={require("../images/down_transfer_history.png")}/>
            )
        }
        else {
            return (
                <TransferHistoryCard
                    key={key}
                    sourceIBAN={operation.accountDestinationIBAN}
                    destinationIBAN={operation.accountSourceIBAN}
                    date={operation.date.substr(0, 10)}
                    sum={operation.sumToTransfer}
                    colorOfCard={"#E0F8EC"}
                    imagePath={require("../images/top_transfer_history.png")}/>
            )

        }
    };

    renderTransferList = () => {

        return this.state.operations.map((currentValue: any, key: any) => {

            return this.renderOneOperation(currentValue, key);
        });

    };

    render() {
        if(this.state.isLoading==false) {
            return (
                <View style={styles.wrapper}>
                    <ScrollView
                        removeClippedSubviews={true}>
                        {this.renderTransferList()}


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