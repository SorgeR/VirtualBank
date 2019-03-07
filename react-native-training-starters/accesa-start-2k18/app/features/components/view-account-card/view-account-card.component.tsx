import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    ImageSourcePropType,
    TouchableOpacity
} from "react-native";
import {Card,} from "native-base";
import styles from "./view-account-card.component.style"

interface IViewAccountsCardProps {
    IBAN: string,
    Budget: number,
    Alias: string,
    Currency: string,
    RightButtonColor?: string,
    ImagePath?: ImageSourcePropType,
    OnPressRightButton: Function,
    RightButtonParameter?: any,
    RightButtonImageHeight?: string,
    RightButtonImageWidth?: string,

}


interface IViewAccountsCardState {

}

export default class ViewAccountsCard extends Component<IViewAccountsCardProps, IViewAccountsCardState> {
    constructor(props: IViewAccountsCardProps) {
        super(props);

    }

    renderRightButton = () => {
        if (this.props.ImagePath != undefined) {
            return (<TouchableOpacity
                style={[styles.goToTopupMoneyTouchableOpacity, {backgroundColor: this.props.RightButtonColor}]}
                onPress={() => {
                    this.props.OnPressRightButton(this.props.RightButtonParameter)
                }}>

                <Image source={this.props.ImagePath}
                       style={[styles.iconImageStyle, {
                           height: this.props.RightButtonImageHeight,
                           width: this.props.RightButtonImageWidth
                       }]}
                       resizeMode={'contain'}/>

            </TouchableOpacity>)
        }
        return null;
    }

    render() {
        const {IBAN, Budget, Alias, Currency} = this.props
        return (

            <Card style={styles.card}>
                <View style={styles.wrapper}>
                    <View style={styles.horizontalWrapper}>
                        <View style={styles.leftWrapper}>
                            <Text style={styles.textIBAN}>{IBAN}</Text>
                            <Text style={styles.textAlias}>{Alias}</Text>
                            <Text style={styles.textBudget}>{Budget} {Currency}</Text>
                        </View>
                        <View style={styles.rightWrapper}>
                            {this.renderRightButton()}
                        </View>
                    </View>
                </View>
            </Card>


        )
    }
}