import {Component} from "react";
import {Keyboard, KeyboardType, Text, TextInput, TextStyle, View, ViewStyle} from "react-native";
import * as React from "react";
import {Icon, Input, Item, Label} from "native-base";
import {__await} from "tslib";
import {resolve} from "url";

interface WithCardValidatorInputProps{

    value:any,
    valid:boolean,
    placeholder:string,
    validate:Function,
    field:string,
    regex:RegExp,
    keyboardType?:KeyboardType,
    style:TextStyle,
    styleError:TextStyle,
    isPassword?:boolean,
    cardNormalStyle:ViewStyle,
    cardErrorStyle:ViewStyle,


}

interface WithCardValidatorInputState {

    value:any,
    valid:boolean,
    styleToUseInTextInput?:TextStyle,
    styleToUseCard?:ViewStyle,
}

export default class WithValidatorInput extends Component<WithCardValidatorInputProps,WithCardValidatorInputState>{

    constructor(props:WithCardValidatorInputProps){
        super(props);
        this.state={
            value:props.value,
            valid:props.valid,
            styleToUseInTextInput:props.style,
            styleToUseCard:props.cardNormalStyle
        }

    }

    /**
     * updates the state according to the new props
     * @param newProps
     */
    componentWillReceiveProps(newProps: WithCardValidatorInputProps){

        if (this.props != newProps) {
            this.setState(newProps);
            this.chooseTheStyleToBeApplied(newProps);
        }
    }

    /**
     * sets the style of the text input and card normal/error
     * @param newProps
     */
    chooseTheStyleToBeApplied(newProps:WithCardValidatorInputProps){

        if(newProps.valid==true || newProps.value==""){
            this.setState({
                styleToUseInTextInput:this.props.style,
                styleToUseCard:this.props.cardNormalStyle
            })
        }
        else {
            if(newProps.value!="") {
                this.setState({
                    styleToUseInTextInput: this.props.styleError,
                    styleToUseCard:this.props.cardErrorStyle
                })
            }
        }
    }


    render() {

        const {value,styleToUseInTextInput}=this.state;
        const {placeholder,isPassword,keyboardType,validate,field,regex}=this.props;
        return(

                <View style={this.state.styleToUseCard}>
                    <TextInput
                        secureTextEntry={isPassword}
                        value={value}
                        onChangeText={(text)=>validate(field,text,regex)}
                        placeholder={placeholder}
                        style={styleToUseInTextInput}
                        underlineColorAndroid='transparent'
                        keyboardType={keyboardType}
                    >

                    </TextInput>

                </View>

        )
    }
}