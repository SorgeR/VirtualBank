import React, {Component} from 'react';
import {View, Text} from "react-native";
import styles from "./chat-bubble.component.styles";

interface IProps {
    text: string
}

export default class ChatBubbleComponent extends Component<IProps, any> {

    constructor(props: IProps) {
        super(props);
    }

    render() {
        return (

            <View style={[styles.balloon, {backgroundColor: '#1084ff'}]}>
                <Text style={styles.textStyle}>{this.props.text}</Text>
                <View
                    style={[
                        styles.arrowContainer,
                        styles.arrowLeftContainer,
                    ]}
                >
                    <View style={styles.arrowLeft}/>
                </View>
            </View>

        )
    }

}