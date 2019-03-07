import React, {Component} from 'react'
import {View, Text, TouchableOpacity, Image, TextInput, ImageBackground} from "react-native";
import styles from "./top-up-dialog.component.style";

interface IAddAccountDialogProps {
    IBAN: string,
    alias: string,
    currency: string,
    idAccount: number,
    actionOnCancelPress: Function,
    actionOnAddPress: Function,
    budget: number,
}

interface IAddAccountDialogState {
    sumToTransfer: number,
}

export default class TopUpDialog extends Component<IAddAccountDialogProps, IAddAccountDialogState> {

    constructor(props: IAddAccountDialogProps) {
        super(props);
        this.state={
            sumToTransfer:0,
        }
    }

    render() {
        return (

            <View style={styles.wrapper}>
                <View style={styles.headerView}>
                    <Text style={styles.addMoneyHeaderText}>Add Money</Text>
                </View>

                <View style={styles.middleView}>
                    <View style={styles.insideMiddleViews}>
                        <Text style={styles.textIBAN}>{this.props.IBAN}</Text>
                        <Text style={styles.textIBAN}>{this.props.alias}</Text>
                        <Text style={styles.textBudget}>Budget {this.props.budget}</Text>
                    </View>


                    <View style={styles.textInputAndCurrencyView}>
                        <View style={styles.textInputView}>
                            <TextInput style={styles.textInputSum}
                                       placeholder={"0"}
                                       keyboardType={"numeric"}
                                       onChangeText={(text) => {
                                           this.setState({
                                               sumToTransfer: Number(text)
                                           })
                                       }}

                            />
                        </View>
                        <View style={styles.textCurrencyView}>
                            <Text style={styles.textCurrency}>{this.props.currency}</Text>
                        </View>

                    </View>


                </View>


                <View style={styles.footerView}>
                    <TouchableOpacity style={styles.touchableOpacityLeft}
                                      onPress={() => {
                                          this.props.actionOnAddPress(this.props.idAccount, this.state.sumToTransfer)
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