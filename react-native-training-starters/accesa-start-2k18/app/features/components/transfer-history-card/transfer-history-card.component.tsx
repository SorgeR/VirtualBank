import React,{Component} from 'react'
import {Card} from "native-base";
import styles from "./transfer-history-card.component.style"
import {Image, Text, View} from "react-native";
interface IProps{
    sourceIBAN:string,
    destinationIBAN:string,
    date:any,
    sum:number,
    colorOfCard:any,
    imagePath:any,
}
export default class TopUpHistoryCardComponent extends Component<IProps,any>{



    render(){

        const {sourceIBAN,destinationIBAN,date,sum,colorOfCard,imagePath}=this.props;
        return(

            <Card style={[styles.card,{backgroundColor:colorOfCard}]}>
                <View style={styles.wrapper}>
                    <View style={styles.horizontalWrapper}>
                        <View style={styles.imageWrapper}>
                            <Image source={imagePath}
                                   style={styles.imageStyle}
                            />

                        </View>
                        <View style={styles.textWrapper}>
                            <Text style={styles.textIBAN}>You: {sourceIBAN}</Text>
                            <Text style={styles.textIBAN}>Friend: {destinationIBAN}</Text>
                            <Text style={styles.textBudget}>{sum} RON</Text>
                            <Text style={styles.textDate}>{date}</Text>

                        </View>

                    </View>

                </View>


            </Card>


        )
    }
}