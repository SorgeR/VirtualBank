import React, {Component} from 'react'
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    ImageSourcePropType} from "react-native";
import {Card } from "native-base";
import styles from "./view-friends-card.component.style"

interface IViewAccountsCardProps {
    phoneNumber: string,
    firstName: string,
    lastName: string,
    ImagePath?: ImageSourcePropType,
    OnPressRightButton: Function,
    RightButtonParameter?: any,
    rightButtonColor?: string,
    RightButtonImagePath?: ImageSourcePropType,
    RightButtonImageHeight?: string,
    RightButtonImageWidth?: string
}


interface IViewAccountsCardState {

}

export default class ViewFriendsCard extends Component<IViewAccountsCardProps, IViewAccountsCardState> {
    constructor(props: IViewAccountsCardProps) {
        super(props);

    }

    renderAvatarImage = () => {
        if (this.props.ImagePath != undefined) {
            return (<Image style={styles.iconImageStyle}
                           source={this.props.ImagePath}
                           resizeMode={'contain'}/>)
        }
        return null;
    }

    renderTouchableOpacity = () => {
        if (this.props.RightButtonImagePath != undefined) {
            return (<TouchableOpacity style={[styles.deleteFriend, {backgroundColor: this.props.rightButtonColor}]}
                                      onPress={() => this.props.OnPressRightButton(this.props.RightButtonParameter)}>

                <Image style={[styles.iconImageDeleteStyle, {
                    height: this.props.RightButtonImageHeight,
                    width: this.props.RightButtonImageWidth
                }]}
                       source={this.props.RightButtonImagePath}
                       resizeMode={'contain'}/>

            </TouchableOpacity>)
        }
        else return null;
    }

    render() {

        return (


            <Card style={styles.card}>
                <View style={styles.wrapper}>
                    <View style={styles.horizontalWrapper}>
                        {/*<View style={styles.leftWrapper}>*/}

                            {/*{this.renderAvatarImage()}*/}


                        {/*</View>*/}
                        <View style={styles.middleWrapper}>
                            <Text style={styles.textName}>{this.props.firstName} {this.props.lastName}</Text>
                            <Text style={styles.textPhoneNumber}>{this.props.phoneNumber}</Text>

                        </View>
                        <View style={styles.rightWrapper}>
                            {this.renderTouchableOpacity()}
                        </View>

                    </View>
                </View>
            </Card>


        )
    }
}