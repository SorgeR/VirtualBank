import React, {Component} from 'react'
import {View, Text, TouchableOpacity, TextInput, ToastAndroid, ActivityIndicator} from "react-native";
import styles from "./add-friend-to-bill.component.style";
import ServiceBill from "../../../services/ServiceBill";
import IRestAmount from "../../../services/ServiceBill";

interface IProps {
    closeButtonFunction:Function,
    addButtonFunction:Function,
    idCreator:number,
    idDebtor:number,
    idBill:number,
}

interface IState {
    restAmount:number,
    sumToPay:number,
    isLoading:boolean,
}
export default class AddFriendToBill extends Component<IProps, IState> {

    constructor(props:IProps) {
        super(props);
        this.state={
            restAmount:0,
            sumToPay:0,
            isLoading:true,
        }
        this.getRestSumFromAPI();

    }


    getRestSumFromAPI=()=>{
        ServiceBill.getRestSumOfBill(this.props.idBill)
            .then((response:IRestAmount)=>{

                this.setState({
                    restAmount:response.restAmount,
                },()=>{
                    this.setState({
                        isLoading:false,
                    })
                })
        })
            .catch(error=>{
                alert(error);
            })
    }

    addDebt=()=>{
        const{idDebtor}=this.props;
        const{sumToPay}=this.state;

        if(sumToPay<=0){
            alert("The sum must be greater than 0!");
            return;
        }
        if(sumToPay>this.state.restAmount){
            alert("The sum must be less than the remained sum to pay!")
            return;
        }

        this.props.addButtonFunction(idDebtor,sumToPay);

    }

    render() {
        if(this.state.isLoading==false) {
            return (

                <View style={styles.wrapper}>
                    <View style={styles.headerView}>
                        <Text style={styles.titleStyle}>Add Friend To Bill</Text>
                    </View>

                    <View style={styles.middleView}>

                        <View style={styles.textWrapper}>
                            <Text style={styles.restOfMoneyTextStyle}>Remained Sum To Pay</Text>
                            <Text style={styles.restSumTextStyle}>{this.state.restAmount} RON</Text>
                        </View>

                        <View style={styles.textWrapper}>
                            <TextInput style={styles.sumToPayTextInput}
                                       placeholder={"Sum the friend has to pay"}
                                       underlineColorAndroid={"transparent"}
                                       onChangeText={(text) => {
                                           this.setState({
                                               sumToPay: Number(text),
                                           })
                                       }}
                                       keyboardType={'numeric'}
                            />
                        </View>
                    </View>

                    <View style={styles.footerView}>
                        <TouchableOpacity style={styles.touchableOpacityLeft}
                                          onPress={() => {
                                              this.addDebt();
                                          }}>
                            <Text style={styles.buttonTextStyle}>ADD</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.touchableOpacityRight}
                                          onPress={() => {
                                              this.props.closeButtonFunction();
                                          }}>
                            <Text style={styles.buttonTextStyle}>CLOSE</Text>
                        </TouchableOpacity>
                    </View>

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