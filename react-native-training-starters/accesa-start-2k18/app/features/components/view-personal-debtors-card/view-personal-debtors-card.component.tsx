import React, {Component} from 'react'
import {Card} from "native-base";
import {Text, View, Button} from "react-native";
import styles from "./view-personal-debtors-card.component.style";

interface IProps {
    billName: string,
    sumToPay: number,
    debtorFirstName: string,
    debtorLastName: string,
    messageDebtorFunction:Function,
}

export default class ViewPersonalDebtorsCard extends Component<IProps, any> {


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
                    <Text style={styles.receiverNameText}>Debtor: {this.props.debtorFirstName} {this.props.debtorLastName}</Text>

                </View>
            </View>
        )
    }

    render() {
        return (
            <Card style={styles.card}>
                <View style={styles.wrapper}>

                    {this.renderTexts()}


                    <View style={styles.buttonWrapper}>

                        <Button
                            onPress={() => {
                                this.props.messageDebtorFunction();
                            }}
                            title={"Message your friend"}/>
                    </View>


                </View>
            </Card>
        )
    }
}