import React, {Component} from 'react'
import {Card} from "native-base";
import {Text, View, Button} from "react-native";
import styles from "./pay-debt-card.component.style";

interface IProps {
    billName: string,
    sumToPay: number,
    creatorAccountId: number,
    creatorIBAN: string,
    creatorFirstName: string,
    creatorLastName: string,
    payDebtFunction: Function,
    payLaterFunction: Function,

}

export default class PayDebtCard extends Component<IProps, any> {


    constructor(props: IProps) {
        super(props);

    }

    renderTexts = () => {
        return (
            <View style={styles.middleWrapper}>

                <View style={styles.topWrapper}>
                    <Text style={styles.billNameText}>{this.props.billName}</Text>
                    <Text style={styles.sumToPayText}>{this.props.sumToPay} RON</Text>
                </View>


                <View style={styles.horizontalLine}/>

                <View style={styles.bottomWrapper}>
                    <Text style={styles.receiverNameText}>Receiver: {this.props.creatorFirstName} {this.props.creatorLastName}</Text>
                    <Text style={styles.creatorIBAN}>Account: {this.props.creatorIBAN}</Text>
                </View>
            </View>
        )
    }

    render() {
        return (
            <Card style={styles.card}>
                <View style={styles.wrapper}>

                    {this.renderTexts()}


                    <View style={styles.buttonsHorizontalWrapper}>
                        <View style={styles.buttonWrapper}>

                            <Button
                                onPress={() => {
                                    this.props.payDebtFunction()
                                }}
                                title={"Pay the debt"}/>
                        </View>

                        <View style={styles.buttonWrapper}>
                            <Button onPress={() => {
                                this.props.payLaterFunction();
                            }} title={"I will pay later"}
                            />
                        </View>

                    </View>

                </View>
            </Card>
        )
    }
}