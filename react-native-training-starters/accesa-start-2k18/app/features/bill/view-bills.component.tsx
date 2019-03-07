import React, {Component} from 'react'
import {ActivityIndicator, AsyncStorage, ScrollView, ToastAndroid, View} from "react-native";
import ViewBillCard from "../components/view-bill-card/view-bill-card.component";
import Dialog from "react-native-popup-dialog";
import FloatingButton from "../components/floating-button/floating-button.component";
import NewBillDialog from "../components/new-bill-dialog/new-bill-dialog.component";
import ServiceUser from "../../services/ServiceUser";
import {IGetAccountsOfUser} from "../../services/ServiceAccount";
import IBill from "../../services/ServiceBill";
import styles from "./view-bill.component.style";
import ServiceBill from "../../services/ServiceBill";
import {SearchBar} from "react-native-elements";

interface IState {
    isDialogVisible: boolean,
    bills: any,
    loggedInUserId: number,
    isLoading: boolean,
    userName: string,
    searchText:string,
}


export default class ViewBillsComponent extends Component<any, IState> {

    constructor(props: any) {
        super(props);
        this.state = {
            isDialogVisible: false,
            loggedInUserId: 0,
            bills: [],
            isLoading: true,
            userName: "",
            searchText:"",
        };
        this.props.navigation.addListener('willFocus', () => {

            this.getDataFromAsyncStorage()

        })
    }

    disableDialog = () => {
        this.setState({
            isDialogVisible: false,
        })
    };

    enableDialog = () => {
        this.setState({
            isDialogVisible: true,
        })
    };

    getDataFromAsyncStorage = () => {

        AsyncStorage.getItem('id')
            .then((response) => {

                if (response != null) {
                    this.setState({
                        loggedInUserId: Number(response),
                    }, () => {
                        this.getBillsFromAPI();
                    })
                }
            })
            .catch((error) => {
                alert('error')
            })

    }

    getBillsFromAPI = () => {

        ServiceUser.getBills(this.state.loggedInUserId)
            .then((response: IGetAccountsOfUser) => {

                this.setState({
                    bills: response.data,
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

    renderOneBill = (bill: IBill, key: any) => {

        if(bill.name.startsWith(this.state.searchText) || this.state.searchText=="")
        {
            return (

                <ViewBillCard
                    navigation={this.props.navigation}
                    key={key}
                    billId={bill.id}
                    billTitle={bill.name}
                    billSum={bill.price}
                    billOwnerId={bill.idCreator}
                    billDate={bill.date.substr(0, 10)}
                    billDescription={bill.description}
                />

            )
        }
        else{
            return null;
        }
    };

    renderAllBills = () => {

        return this.state.bills.map((currentValue: any, key: any) => {

            return this.renderOneBill(currentValue, key);
        });


    };

    saveBill = (idOwner: number, description: string, billName: string, account: number, sum: number) => {

        ServiceBill.createBill(idOwner, account, billName, description, sum)
            .then(response => {
                ToastAndroid.show("Successfully payed the bill!", ToastAndroid.SHORT);
                this.setState({
                    isLoading:true,
                });
                this.getBillsFromAPI();
            })
            .catch(error => {
                alert(error)
            })

    };

    render() {
        if (!this.state.isLoading) {
            return (
                <View style={styles.wrapper}>
                    <SearchBar
                        platform="android"
                        cancelIcon={{type: 'font-awesome', name: 'chevron-left'}}
                        placeholder='Search by bill name'
                        onChangeText={(text) => this.setState({
                            searchText: text,
                        })}
                    />
                    <ScrollView
                        removeClippedSubviews={true}>
                        <Dialog
                            width={320}
                            height={450}
                            visible={this.state.isDialogVisible}
                            children={
                                <NewBillDialog
                                    saveBillFunction={this.saveBill}
                                    idOwner={this.state.loggedInUserId}
                                    onClosePress={this.disableDialog}
                                />
                            }
                        />

                        {this.renderAllBills()}


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