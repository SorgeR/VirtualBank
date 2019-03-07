import React, {Component} from "react"
import {ActivityIndicator, ScrollView, View} from "react-native";
import ServiceBill from "../../services/ServiceBill";
import IDebtor from "../../services/ServiceBill";
import ViewMembersBillDetails from "../components/view-members-bill-details-card/view-members-bill-details.component";
import styles from "./view-bill-members-details.component.style";

interface IState {
    members: any,
    billId: number,
    isLoading:boolean,
}

export default class ViewBillMembersDetailsComponent extends Component<any, IState> {

    constructor(props: any) {
        super(props);

        this.state = {
            members: [],
            billId: this.props.navigation.getParam("billID", 0),
            isLoading:true,
        };
        const willFocusSubscription = this.props.navigation.addListener('willFocus', () => {

            this.getMembersFromAPI();

        })
    }

    getMembersFromAPI = () => {
        ServiceBill.getDebtorsOfBill(this.state.billId)
            .then((response: any) => {
                this.setState({
                    members: response.data,
                },()=>{
                    this.setState({
                        isLoading:false,
                    })
                })
            })
            .catch(err => {
                alert(err);
            })
    };

    renderDebtor = (debtor: IDebtor, key: any) => {

        if (debtor.payed == true) {

            return (
                <ViewMembersBillDetails
                    key={key}
                    firstName={debtor.uFirstName}
                    lastName={debtor.uLastName}
                    sumToPay={debtor.sumToPay}
                    imageDoneNotDone={require("../../features/images/done_image.png")}
                    rightButtonImageHeight={"50%"}
                    rightButtonImageWidth={"50%"}/>
            )
        }
        else {
            return (
                <ViewMembersBillDetails
                    key={key}
                    firstName={debtor.uFirstName}
                    lastName={debtor.uLastName}
                    sumToPay={debtor.sumToPay}
                    imageDoneNotDone={require("../../features/images/delete_friend.png")}
                    rightButtonImageHeight={"50%"}
                    rightButtonImageWidth={"50%"}/>
            )
        }

    };

    renderAllDebtors = () => {

        return this.state.members.map((item: IDebtor, key: any) => {
            return this.renderDebtor(item, key);
        })
    };


    render() {
        if(this.state.isLoading==false) {


            return (

                <View>
                    <ScrollView

                        removeClippedSubviews={true}>

                        {this.renderAllDebtors()}

                    </ScrollView>
                </View>

            )
        }
        else{
            return (
                <View style={styles.loadingViewIndicator}>
                    <ActivityIndicator size={50} color="#3698f0"/>
                </View>)
        }
    }
}