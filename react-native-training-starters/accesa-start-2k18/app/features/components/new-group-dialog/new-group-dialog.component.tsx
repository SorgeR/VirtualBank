import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image, TextInput, ImageBackground} from "react-native";
import styles from "./new-group-dialog.component.style"

interface IAddAccountDialogProps {

    actionOnAddPress: Function,
    actionOnCancelPress: Function,
    userId: number,
}

interface IAddAccountDialogState {

    groupName: string,
}

export default class NewGroupDialog extends Component<IAddAccountDialogProps, IAddAccountDialogState> {

    constructor(props: IAddAccountDialogProps) {
        super(props);
        this.state = {
            groupName: "",
        }
    }

    render() {
        return (

            <View style={{flex: 1, flexGrow: 1}}>
                <View style={styles.headerView}>
                    <Text style={styles.titleStyle}>Add a new group</Text>
                </View>

                <View style={styles.middleView}>
                    <Text style={styles.textChooseGroupName}> Choose a group name </Text>
                    <TextInput placeholder={"Group name"}
                               style={styles.textInputChooseGroupNameStyle}
                               onChangeText={(text) => {
                                   this.setState({
                                       groupName: text,
                                   })
                               }}/>

                </View>


                <View style={styles.footerView}>
                    <TouchableOpacity style={styles.touchableOpacityLeft}
                                      onPress={() => {
                                          this.props.actionOnAddPress(this.state.groupName, this.props.userId)
                                      }}>
                        <Text style={styles.buttonTextStyle}>ADD</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.touchableOpacityRight}
                                      onPress={() => {
                                          this.props.actionOnCancelPress()
                                      }}>
                        <Text style={styles.buttonTextStyle}>CLOSE</Text>
                    </TouchableOpacity>
                </View>

            </View>


        )
    }

}