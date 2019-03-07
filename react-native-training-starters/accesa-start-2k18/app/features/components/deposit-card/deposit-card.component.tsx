import React,{Component} from "react";
import { Card} from "native-base";
import {View,Button,Text} from "react-native";
import styles from "./deposit-card.component.style";


interface IProps{
    title:string,
    sumToGet:number,
    date:any,
    enableDialog:Function,
}
export default class DepositCard extends Component<IProps,any>{

    render(){
        return(
            <Card style={styles.card}>
                <View style={styles.wrapper}>
                    <View style={styles.horizontalWrapper}>
                        <View style={styles.leftTextWrapper}>
                            <Text style={styles.titleText}>Title: {this.props.title}</Text>
                            <Text style={styles.sumToGetText}>Sum To Get: {this.props.sumToGet}</Text>
                        </View>
                        <View style={styles.dateWrapper}>
                            <Text style={styles.dateText}>{this.props.date}</Text>
                        </View>
                    </View>

                    <Button title={"Destroy deposit!"}
                            onPress={()=>{
                                this.props.enableDialog();
                            }}/>

                </View>
            </Card>
        )
    }
}