import React,{Component} from 'react'
import {Card} from "native-base";
import styles from "./top-up-history-card.component.style"
import {Image, View, Text, Animated, Easing} from "react-native";

interface IProps {
    IBAN:string,
    Date:any,
    Sum:number,
    Alias:string,
}

export default class TopUpHistoryCardComponent extends Component<IProps,any>{


    render(){

        const {IBAN,Date,Sum,Alias}=this.props;
        return(

        <Card style={styles.card}>
            <View style={styles.wrapper}>
                <View style={styles.horizontalWrapper}>
                    <View style={styles.imageWrapper}>
                        <Image source={require("../../images/top_up_history_icon.png")}
                            style={styles.imageStyle}
                        />

                    </View>
                    <View style={styles.textWrapper}>
                        <Text style={styles.textIBAN}>{IBAN}</Text>
                        <Text style={styles.textAlias}>{Alias}</Text>
                        <Text style={styles.textBudget}>{Sum} RON</Text>
                        <Text style={styles.textDate}>{Date}</Text>

                    </View>

                </View>

            </View>


        </Card>

        )
    }
}