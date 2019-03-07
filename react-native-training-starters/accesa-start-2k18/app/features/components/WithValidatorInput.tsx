import {Component} from "react";
import {Keyboard, KeyboardType, Text, TextInput, TextStyle, View, ViewStyle} from "react-native";
import * as React from "react";
import {Icon, Input, Item, Label} from "native-base";
import {__await} from "tslib";
import {resolve} from "url";

interface WithValidatorInputProps{

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


}

interface WithValidatorInputState {

    value:any,
    valid:boolean,
    styleToUseInTextInput?:TextStyle,
}

export default class WithValidatorInput extends Component<WithValidatorInputProps,WithValidatorInputState>{

    constructor(props:WithValidatorInputProps){
        super(props);
        this.state={
            value:props.value,
            valid:props.valid,
            styleToUseInTextInput:props.style,
        }

    }


    /**
     * updates the state according to the new props
     * @param newProps
     */
    componentWillReceiveProps(newProps: WithValidatorInputProps){

        if (this.props != newProps) {
            this.setState(newProps);
            this.chooseTheStyleToBeApplied(newProps);
        }
    }

    /**
     * sets the style of the text input normal/error
     * @param newProps
     */
    chooseTheStyleToBeApplied(newProps:WithValidatorInputProps){

        if(newProps.valid==true || newProps.value==""){
            this.setState({
                styleToUseInTextInput:this.props.style
            })
        }
        else {
            if(newProps.value!="") {
                this.setState({
                    styleToUseInTextInput: this.props.styleError
                })
            }
        }
    }


    render() {

        const {value,styleToUseInTextInput}=this.state;
        const {placeholder,isPassword,keyboardType,validate,field,regex}=this.props;
        return(
        <View>
            <View style={{flexDirection:'row'}}>
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
        </View>
        )
    }
}