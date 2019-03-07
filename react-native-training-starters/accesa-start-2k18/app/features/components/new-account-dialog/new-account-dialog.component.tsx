import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image, TextInput, ImageBackground, Picker} from "react-native";
import styles from "./new-account-dialog.component.style";

interface IAddAccountDialogProps {
    idOwner: number,
    actionOnCancelPress: Function,
    actionOnAddPress: Function,

}

interface IAddAccountDialogState {
    alias: string,
    chosenCurrency: string,
}

export default class NewAccountDialog extends Component<IAddAccountDialogProps, IAddAccountDialogState> {

    constructor(props: IAddAccountDialogProps) {
        super(props);
        this.state = {
            chosenCurrency: "0",
            alias: ""
        }
    }

    handleOnValueChangePicker = (itemValue: any) => {
        if (itemValue != 0) {
            this.setState({
                chosenCurrency: itemValue
            });
        }
    }

    render() {
        return (

            <View style={styles.wrapper}>
                <View style={styles.headerView}>
                    <Text style={styles.addAccountHeaderText}>Add Account</Text>
                </View>

                <View style={styles.middleView}>
                    <View style={styles.accountAliasWrapper}>
                        <Text style={styles.textCurrency}>Account alias</Text>
                        <TextInput placeholder={"Enter an alias"}
                                   style={styles.aliasTextInput}
                                   onChangeText={(text) => {
                                       this.setState({
                                           alias: text
                                       });
                                   }}/>

                    </View>
                    <View style={styles.accountAliasWrapper}>
                        <Text style={styles.textCurrency}>Account currency</Text>
                        <Picker
                            mode={'dropdown'}
                            style={styles.pickerStyle}
                            selectedValue={this.state.chosenCurrency}
                            onValueChange={(itemValue) => {
                                this.handleOnValueChangePicker(itemValue)
                            }}>
                            <Picker.Item label="Select account's currency..." value='0'/>
                            <Picker.Item label="RON" value='RON'/>

                        </Picker>

                    </View>


                </View>


                <View style={styles.footerView}>
                    <TouchableOpacity style={styles.touchableOpacityLeft}
                                      onPress={() => {
                                          this.props.actionOnAddPress(this.props.idOwner, this.state.chosenCurrency, this.state.alias)
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