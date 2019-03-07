import React, {Component} from 'react';
import ChatBubbleComponent from "../components/chat-bubble/chat-bubble.component";
import {AsyncStorage, Button, ScrollView, TextInput, View} from "react-native";
import ServiceMessage from "../../services/ServiceMessage";
import styles from "./conversation.component.style";

interface IState {
    idSender: number,
    idReceiver: number,
    text: string,
    date: any,
    messages: any,
    isLoading: boolean,

}

interface IMessage {
    idSender: number,
    idReceiver: number,
    text: string,
    date: any,
}

var interval: any;

export default class ConversationComponent extends Component<any, IState> {


    constructor(props: any) {
        super(props);
        this.state = {
            idSender: 0,
            idReceiver: this.props.navigation.getParam("friendID", "default"),
            text: "",
            date: Date.now(),
            messages: [],
            isLoading: true,

        };

        this.props.navigation.addListener('willFocus', () => {

            this.getDataFromAsyncStorage()

        });

        this.props.navigation.addListener('willBlur', () => {

            clearInterval(interval)

        });
    }

    getDataFromAPI = () => {

        ServiceMessage.getMessages(this.state.idSender, this.state.idReceiver)
            .then(response => {

                this.setState({
                    messages: response.data,
                }, () => {
                    this.setState({
                        isLoading: false,
                    });
                })
            })
            .catch(error => {
                alert("error");
            });
    };

    createMessage = () => {
        ServiceMessage.addMessage(this.state.idSender, this.state.idReceiver, this.state.text)
            .then(resolve => {
                this.setState({
                    text:"",
                });
                clearInterval(interval);
                interval = setInterval(() => {
                        this.getDataFromAPI();
                    }
                    , 1000);
            })
            .catch(error => {
                alert("error")
            })

    };

    renderSenderMessage = (message: IMessage, key: any) => {
        return (
            <View key={key} style={styles.rightMessageStyle}>
                <ChatBubbleComponent text={message.text}/>
            </View>
        )
    };

    renderReceiverMessage = (message: IMessage, key: any) => {
        return (
            <View key={key} style={styles.leftMessageStyle}>
                <ChatBubbleComponent text={message.text}/>
            </View>
        )
    };

    renderMessages = () => {
        return this.state.messages.map((currentValue: IMessage, key: any) => {

            if (currentValue.idSender == this.state.idSender) {
                return this.renderSenderMessage(currentValue, key);
            }

            if (currentValue.idReceiver == this.state.idSender) {
                return this.renderReceiverMessage(currentValue, key);
            }
            return null;
        });

    };

    getDataFromAsyncStorage = () => {

        AsyncStorage.getItem('id')
            .then((response) => {

                if (response != null) {
                    this.setState({
                        idSender: Number(response),
                    }, () => {
                        this.getDataFromAPI();
                    });
                }
            })
            .catch((error) => {
                alert('error')
            });
    };


    render() {
        if (this.state.isLoading == false) {
            var scrollView: any;
            return (
                <View style={styles.wrapper}>

                    <View style={styles.scrollWrapper}>
                        <ScrollView ref={ref => scrollView = ref}
                                    onContentSizeChange={(contentWidth, contentHeight) => {
                                        scrollView.scrollToEnd({animated: true});
                                    }}>

                            {this.renderMessages()}
                        </ScrollView>

                    </View>

                    <View style={styles.textAndButtonHorizontalWrapper}>
                        <View style={styles.textWrapper}>
                            <TextInput placeholder={"Message to send..."}
                                       value={this.state.text}
                                       onChangeText={text => this.setState({text: text})}
                                       style={styles.textInputStyle}
                            />

                        </View>
                        <View style={styles.buttonWrapper}>
                            <Button title={"Send"} onPress={this.createMessage}/>
                        </View>
                    </View>


                </View>
            )
        }
        else return null;
    }
}