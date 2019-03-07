import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageSourcePropType, Button
} from "react-native";
import {Card, Container, Icon, Input, Item,} from "native-base";
import styles from "./view-groups-card.component.style"

interface IViewAccountsCardProps {
    idGroup: number,
    name: string,
    createDate: string,
    OnPressRightButton: Function,
    ImagePath: ImageSourcePropType,
    RightImageHeight: string,
    RightImageWidth: string,

}


interface IViewAccountsCardState {

}

export default class ViewAccountsCard extends Component<IViewAccountsCardProps, IViewAccountsCardState> {
    constructor(props: IViewAccountsCardProps) {
        super(props);

    }


    render() {

        return (


            <Card style={styles.card}>
                <View style={styles.wrapper}>
                    <View style={styles.horizontalWrapper}>
                        <View style={styles.middleWrapper}>
                            <Text style={styles.textName}>{this.props.name}</Text>
                            <Text style={styles.textDate}>{this.props.createDate}</Text>
                        </View>
                        <View style={styles.rightWrapper}>
                            <TouchableOpacity style={styles.deleteGroup}
                                              onPress={() => {
                                                  this.props.OnPressRightButton(this.props.idGroup)
                                              }}>
                                <Image source={this.props.ImagePath}
                                       style={{
                                           height: this.props.RightImageHeight,
                                           width: this.props.RightImageWidth
                                       }}
                                       resizeMode={'contain'}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Card>


        )
    }
}