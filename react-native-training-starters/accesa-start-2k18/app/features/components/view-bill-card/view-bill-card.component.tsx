import React, {Component} from 'react'
import {View, Text, Image, Button, ActivityIndicator, AsyncStorage} from "react-native";
import {Card} from "native-base";
import styles from "./view-bill-card.component.style";
import ServiceUser from "../../../services/ServiceUser";
import {AppRoutes} from "../../../app.routes";

interface IProps {
    billId: number,
    billTitle: string,
    billSum: number,
    billOwnerId: number,
    billDate: any,
    billDescription: string,
    navigation?:any,


}

interface IState {
    owner: any,
    isLoading: boolean,
    loggedInUserID:number,
}


export default class ViewBillsCard extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = ({
            owner: null,
            isLoading: true,
            loggedInUserID:0,
        });

            this.getDataFromAsyncStorage();

    }

    getDataFromAsyncStorage = () => {

        AsyncStorage.getItem('id')
            .then((response) => {

                if (response != null) {
                    this.setState({
                        loggedInUserID: Number(response),
                    }, ()=>{
                        this.getOwnerById();
                    })
                }
            })
            .catch((error) => {
                alert('error')
            })

    }


    getOwnerById() {
        ServiceUser.getUserByID(this.props.billOwnerId)
            .then(response => {
                this.setState({
                    owner: response,
                }, () => {
                    this.setState({
                        isLoading: false,
                    })
                })
            })
            .catch(error => {
                alert(error);
            })
    }

    navigateToAddMembersToBill=()=>{
        this.props.navigation.navigate(AppRoutes.view_friends_to_add_to_bill,
            {"billID":this.props.billId,
                    "ownerID":this.props.billOwnerId,
            });
    };

    navigateToViewMembers=()=>{
        this.props.navigation.navigate(AppRoutes.view_members_of_bill,
            {"billID":this.props.billId});
    };

    renderButtons = () => {
        if (this.state.loggedInUserID == this.props.billOwnerId) {
            return (
                <View style={styles.buttonsWrapper}>
                    <View style={styles.twoButtonsViewStyle}>
                        <Button title={"View Members Status"} onPress={() => {
                            this.navigateToViewMembers();
                        }}/>
                    </View>
                    <View style={styles.twoButtonsViewStyle}>
                        <Button title={"Add New Members"} onPress={() => {
                            this.navigateToAddMembersToBill();
                        }}/>
                    </View>
                </View>
            )
        }
        else {
            return (
                <View style={styles.buttonsWrapper}>
                    <View style={styles.wrapper}>
                        <Button title={"View Members Status"} onPress={() => {
                            this.navigateToViewMembers();
                        }}/>
                    </View>
                </View>
            )
        }
    };

    render() {
        if (this.state.isLoading == false) {
            return (

                <View style={styles.wrapper}>
                    <Card style={styles.card}>
                        <View style={styles.wrapper}>
                            <View style={styles.topHorizontalWrapper}>

                                <View style={styles.wrapper}>
                                    <Image source={require("../../images/add_member_to_group.png")}
                                           style={styles.imageStyle}/>
                                </View>

                                <View style={styles.topTextWrapper}>

                                    <Text>{this.props.billTitle}</Text>
                                    <Text>{this.props.billSum} RON</Text>
                                    <Text>Payed by: {this.state.owner.firstName}</Text>
                                </View>

                                <View style={styles.topDateWrapper}>
                                    <Text>{this.props.billDate}</Text>
                                </View>

                            </View>

                            <View style={styles.middleWrapper}>
                                <Text>Description:</Text>
                                <Text>{this.props.billDescription}</Text>
                            </View>

                            {this.renderButtons()}
                        </View>
                    </Card>
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
