import React,{Component} from 'react'

import {Text, TouchableOpacity} from "react-native";
import styles from './floating-button.component.style';


interface IProps{
    action:Function,
}
export default class FloatingButton extends Component<IProps,any>{

    constructor(props:IProps){
        super(props);
    }

    render(){
        return(
            <TouchableOpacity
            style={styles.floatingButton}
            onPress={() => {
                this.props.action();
            }}
        >
            <Text style={styles.textStyle}>+</Text>
        </TouchableOpacity>)
    }
}