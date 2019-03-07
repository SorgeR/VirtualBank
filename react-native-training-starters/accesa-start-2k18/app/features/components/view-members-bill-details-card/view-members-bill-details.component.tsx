import React, {Component} from 'react'
import styles from "./view-members-bill-details.component.style";
import {Card} from "native-base";
import {Image, Text, View} from "react-native";


interface IProps {
    firstName: string,
    lastName: string,
    sumToPay: number,
    imageDoneNotDone:any,
    rightButtonImageHeight:any,
    rightButtonImageWidth:any,
}

export default class ViewMembersBillDetails extends Component<IProps, any> {


    render() {
        return (

            <Card style={styles.card}>
                <View style={styles.wrapper}>
                    <View style={styles.horizontalWrapper}>

                        <View style={styles.middleWrapper}>
                            <Text style={styles.textName}>{this.props.firstName} {this.props.lastName}</Text>
                            <Text style={styles.textSumToPay}>To Pay: {this.props.sumToPay}</Text>

                        </View>
                        <View style={styles.rightWrapper}>
                            <Image style={[styles.iconRightImageStyle, {
                                height: this.props.rightButtonImageHeight,
                                width: this.props.rightButtonImageWidth
                            }]}
                                   source={this.props.imageDoneNotDone}
                                   resizeMode={'contain'}/>
                        </View>

                    </View>
                </View>
            </Card>

        )
    }
}