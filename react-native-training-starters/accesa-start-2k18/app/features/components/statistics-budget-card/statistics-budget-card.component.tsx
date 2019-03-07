import React, {Component} from 'react'
import {Card} from "native-base";
import {View, Text, Image} from "react-native";
import styles from "./statistics-budget-card.component.style";

interface IProps{
    budget:number,
    date:string,

}
export default class StatisticsBudgetCard extends Component<IProps, any> {
    render() {
        return (
            <Card style={styles.card}>
                <View style={styles.wrapper}>

                    <View style={styles.imageWrapper}>
                        <Image source={require("../../images/top_up_history_icon.png")}
                               style={styles.imageStyle}
                               resizeMode={'contain'}/>
                    </View>

                    <View style={styles.textWrapper}>
                        <Text style={styles.textBudget}>Budget: {this.props.budget}</Text>
                        <Text style={styles.textDate}>{this.props.date}</Text>
                    </View>
                </View>
            </Card>
        )
    }
}